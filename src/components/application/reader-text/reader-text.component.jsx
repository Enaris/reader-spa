import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './reader-text.styles.scss';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { selectTextArray, selectTextProcessing, selectTextArrayRowIndexesAll, selectReadingId } from '../../../redux/reading/reading.selectors';
import { createStructuredSelector } from 'reselect';
import { selectPartEnd, selectReaderPaused, selectPartIndexes } from '../../../redux/reader/reader.selectors';
import { resumeReadingStart } from '../../../redux/reader/reader.actions';
import { FixedSizeList } from 'react-window';
import ReaderPauseSaveForm from '../../forms/reader-pause-save-form/reader-pause-save-form.component';
import { setReadingPosition } from '../../../redux/offline-library/offline-lib.actions';

const ReaderText = ({ textArray, 
  textRowsIndexesAll, 
  currentEnd, 
  textProcessing, 
  resume, 
  saveReadingPosOffline,
  readerPaused,
  readingId,
  currentPartIndexes,
  }) => {

  var tWidth = 630;
  var textRowsIndexes = textRowsIndexesAll.l
  if (useMediaQuery('(max-width: 640px)')) {
    tWidth = 450;
    textRowsIndexes = textRowsIndexesAll.m;
  }
  if (useMediaQuery('(max-width: 480px)')) {
    tWidth = 300;
    textRowsIndexes = textRowsIndexesAll.s;
  }
  const textRef = React.createRef();
  const isInRange = (currentEnd, start, end) => currentEnd >= start && currentEnd <= end;
  const handleResume = (wIndex, start) => {
    resume(wIndex, start);
  }
  useEffect(() => {
    if (readerPaused) {
      const stWordIndex = currentPartIndexes[0];
      const currentRowIndex = textRowsIndexes.findIndex(row => row.some(index => index === stWordIndex));
      textRef.current.scrollToItem(currentRowIndex, 'smart');
    }
  }, [readerPaused, currentPartIndexes, textRowsIndexes, textRef])

  const TextRow = ({ index, style }) => {
    return (
      <div style={ style }>
        {
          textRowsIndexes[index].map(wordIndex => {
            const wordObj = textArray[wordIndex];
            return (
              <React.Fragment key={ wordObj.start }>
                {
                  isInRange(currentEnd, wordObj.start, wordObj.end) 
                  ? <span className='word-current' onClick={() => handleResume(wordIndex, wordObj.start)}>{ wordObj.word }</span>
                  : <span onClick={() => handleResume(wordIndex, wordObj.start)}>{ wordObj.word }</span>
                }
                <span>&nbsp;</span>
              </React.Fragment>
            )
          })
        }
      </div>
    )
  }

  

  const handleSaveSession = () => {
    saveReadingPosOffline(readingId, currentPartIndexes.length === 0 ? 0 : currentPartIndexes[0]);
  }

  const resumeAtPausedPosition = alsoSaveSession => {
    if (alsoSaveSession) {
      handleSaveSession();
    }
    const index = currentPartIndexes.length === 0 ? 0 : currentPartIndexes[0];
    const start = textArray[index].start;
    resume(index, start);
  }
  
  return (
    <div className='reader-text-container'>
      <div className='reader-text'>
        { !textProcessing && 
          <FixedSizeList 
            ref={ textRef }
            itemCount={ textRowsIndexes.length }
            itemSize={ 20 }
            height={ window.innerHeight * 0.8 }
            width={ tWidth }
          >
            { TextRow }
          </FixedSizeList>
        }
      </div>
      <ReaderPauseSaveForm 
        onSave={ handleSaveSession }
        onResume={ resumeAtPausedPosition }
      />
      
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  textArray: selectTextArray, 
  currentEnd: selectPartEnd, 
  textProcessing: selectTextProcessing, 
  textRowsIndexesAll: selectTextArrayRowIndexesAll, 
  readerPaused: selectReaderPaused, 
  readingId: selectReadingId, 
  currentPartIndexes: selectPartIndexes
})

const mapDispatchToProps = dispatch => ({
  resume: (resumeAt, wordStart) => dispatch(resumeReadingStart(resumeAt, wordStart)),
  saveReadingPosOffline: (readingId, position) => dispatch(setReadingPosition(readingId, position))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReaderText);
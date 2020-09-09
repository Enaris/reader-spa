import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './reader-text.styles.scss';
import { selectTextArray, selectTextProcessing, selectTextArrayRowIndexes } from '../../../redux/reading/reading.selectors';
import { createStructuredSelector } from 'reselect';
import ReaderTextWord from '../reader-text-word/reader-text-word.component';
import { selectPartEnd, selectReaderPaused, selectCurrentRow } from '../../../redux/reader/reader.selectors';
import { resumeReadingStart } from '../../../redux/reader/reader.actions';
import { FixedSizeList } from 'react-window';

const ReaderText = ({ textArray, textRowsIndexes, currentEnd, textProcessing, resume, readerPaused, currentRow }) => {

  const textRef = React.createRef();
  const isInRange = (currentEnd, start, end) => currentEnd >= start && currentEnd <= end;
  const handleResume = (wIndex, start) => {
    resume(wIndex, start);
  }
  useEffect(() => {
    if (readerPaused) {
      textRef.current.scrollToItem(currentRow, 'smart');
    }
  }, [readerPaused, currentRow, textRef])

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
  
  return (
    <div className='reader-text'>
     
      { !textProcessing && 
        <FixedSizeList 
          ref={ textRef }
          itemCount={ textRowsIndexes.length }
          itemSize={ 20 }
          height={ 400 }
          width={ 700 }
        >
          { TextRow }
        </FixedSizeList>
      }
      
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  textArray: selectTextArray, 
  currentEnd: selectPartEnd, 
  textProcessing: selectTextProcessing, 
  textRowsIndexes: selectTextArrayRowIndexes, 
  readerPaused: selectReaderPaused, 
  currentRow: selectCurrentRow
})

const mapDispatchToProps = dispatch => ({
  resume: (resumeAt, wordStart) => dispatch(resumeReadingStart(resumeAt, wordStart))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReaderText);
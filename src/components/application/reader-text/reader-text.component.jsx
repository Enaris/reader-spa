import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './reader-text.styles.scss';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { selectTextArray, selectTextProcessing, selectTextArrayRowIndexesAll, selectReadingId } from '../../../redux/reading/reading.selectors';
import { createStructuredSelector } from 'reselect';
import { selectPartEnd, selectReaderPaused, selectPartIndexes, selectTestMode, selectCurrentSpeed } from '../../../redux/reader/reader.selectors';
import { resumeReadingStart } from '../../../redux/reader/reader.actions';
import { FixedSizeList } from 'react-window';
import ReaderPauseSaveForm from '../../forms/reader-pause-save-form/reader-pause-save-form.component';
import { setReadingPosition } from '../../../redux/offline-library/offline-lib.actions';
import { selectCurrentUser } from '../../../redux/auth/auth.selectors';
import { saveSessionStart } from '../../../redux/reading-session/reading-session.actions';
import { selectSavingSession } from '../../../redux/reading-session/reading-session.selectors';


const ReaderText = ({ textArray, 
  textRowsIndexesAll, 
  currentEnd, 
  textProcessing, 
  resume, 
  saveReadingPosOffline,
  readerPaused,
  readingId,
  currentPartIndexes,
  saveSession, 
  user, 
  savingSession,
  testMode,
  currentSpeed
  }) => {

  const { push } = useHistory();
  if (textArray === null || textArray.length === 0) {
    push('/lib');
  }

  var tWidth = 800;
  var textRowsIndexes = textRowsIndexesAll.l
  if (useMediaQuery('(max-width: 870px)')) {
    tWidth = 540;
    textRowsIndexes = textRowsIndexesAll.m;
  }
  if (useMediaQuery('(max-width: 610px)')) {
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
    user 
    ? saveSession(user.aspUserId)
    : saveReadingPosOffline(readingId, currentPartIndexes.length === 0 ? 0 : currentPartIndexes[0]);
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
      { testMode &&
        <div className='reader-text-test'> 
          Pause reader when speed feels comfortable. 
        </div>
      }
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
      { !testMode ?
        <ReaderPauseSaveForm 
          onSave={ handleSaveSession }
          onResume={ resumeAtPausedPosition }
          isLoading={ savingSession }
          resumeOnly={ readingId === null }
          testMode={ testMode }
        />
        :
        <div className='reader-text-test'>
          { currentSpeed && `Your speed was: ${currentSpeed.speed.toFixed(2)} wpm.`}
        </div>
      }
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
  currentPartIndexes: selectPartIndexes, 
  user: selectCurrentUser,
  savingSession: selectSavingSession,
  testMode: selectTestMode, 
  currentSpeed: selectCurrentSpeed
})

const mapDispatchToProps = dispatch => ({
  resume: (resumeAt, wordStart) => dispatch(resumeReadingStart(resumeAt, wordStart)),
  saveReadingPosOffline: (readingId, position) => dispatch(setReadingPosition(readingId, position)), 
  saveSession: aspUserId => dispatch(saveSessionStart(aspUserId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReaderText);
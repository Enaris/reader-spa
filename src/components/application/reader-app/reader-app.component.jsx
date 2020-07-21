import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './reader-app.styles.scss';
import { selectTextLoading, selectTextEnded, selectText } from '../../../redux/reading/reading.selectors';
import { selectReaderPaused, selectTimeout } from '../../../redux/reader/reader.selectors';
import ReaderText from '../reader-text/reader-text.component';
import ReaderWord from '../reader-word/reader-word.component';
import { pauseReading, resumeReading } from '../../../redux/reader/reader.actions';
import { wTimeoutStop } from '../../../utils/w-delay';
import { textToArray } from '../../../utils/text-helpers';
import { setTextArray } from '../../../redux/reading/reading.actions';

const ReaderApp = ({ text, textLoading, textEnded, readerPaused, pauseReader, resumeReader, timeoutId, processTextToArray }) => {

  useEffect(() => {
    processTextToArray(textToArray(text))
  }, [processTextToArray, text]);

  const pause = () => {
    wTimeoutStop(timeoutId, pauseReader);
  }

  return (
    <div className='reader-app'>
      {
        textLoading ?
        <div> Loading </div> :
        textEnded || readerPaused ?
        <ReaderText /> :
        <div className='reader-word-container'>
          <div className='overlay' onClick={() => pause()}></div>
          <ReaderWord />
        </div>
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  textLoading: selectTextLoading,
  textEnded: selectTextEnded,
  readerPaused: selectReaderPaused, 
  timeoutId: selectTimeout,
  text: selectText 
})

const mapDispatchToProps = dispatch => ({
  pauseReader: () => dispatch(pauseReading()),
  resumeReader: () => dispatch(resumeReading()), 
  processTextToArray: text => dispatch(setTextArray(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReaderApp);
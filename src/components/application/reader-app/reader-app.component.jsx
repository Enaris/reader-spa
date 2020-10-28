import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './reader-app.styles.scss';
import { selectTextProcessing, selectTextEnded } from '../../../redux/reading/reading.selectors';
import { selectReaderPaused, selectTestMode } from '../../../redux/reader/reader.selectors';
import ReaderText from '../reader-text/reader-text.component';
import ReaderWord from '../reader-word/reader-word.component';
import { pauseReading } from '../../../redux/reader/reader.actions';
import { ReaderAppStyled } from './reader-app.styled';
import { setSpeedOptions } from '../../../redux/reader-options/reader-options.actions';

const ReaderApp = ({ textProcessing, testMode, setSpeedOpt, textEnded, readerPaused, pauseReader }) => {

  useEffect(() => {
    if (testMode) {
      setSpeedOpt({
        initialCPM: -1, 
        initialWPM: 300, 
        targetWPM: -1, 
        targetCPM: -1, 
        breakIfLonger: -1, 
        slowIfLonger: -1, 
        appendIfShorter: -1, 
        maxAppend: -1, 
        initialAccelerationTimeSecs: -1, 
        addPerMin: 340, 
        slowTo: -1 
      });
    }
  }, [testMode, setSpeedOpt])

  const pause = () => {
    pauseReader();
  }

  return (
    <ReaderAppStyled>
      {
        textProcessing ?
        <div> Loading </div> :
        textEnded || readerPaused ?
        <ReaderText /> :
        <div className='reader-word-container'>
          <div className='overlay' onClick={() => pause()}></div>
          <ReaderWord />
        </div>
      }
    </ReaderAppStyled>
  )
}

const mapStateToProps = createStructuredSelector({
  textProcessing: selectTextProcessing,
  textEnded: selectTextEnded,
  readerPaused: selectReaderPaused, 
  testMode: selectTestMode
})

const mapDispatchToProps = dispatch => ({
  pauseReader: () => dispatch(pauseReading()),
  setSpeedOpt: opt => dispatch(setSpeedOptions(opt))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReaderApp);
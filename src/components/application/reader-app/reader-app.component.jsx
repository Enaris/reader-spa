import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './reader-app.styles.scss';
import { selectTextLoading, selectTextEnded, selectText } from '../../../redux/reading/reading.selectors';
import { selectReaderPaused } from '../../../redux/reader/reader.selectors';
import ReaderText from '../reader-text/reader-text.component';
import ReaderWord from '../reader-word/reader-word.component';
import { pauseReading } from '../../../redux/reader/reader.actions';
import { setTextArray, setLoadTextStart, setLoadTextSuccess } from '../../../redux/reading/reading.actions';
import { ReaderAppStyled } from './reader-app.styled';
import { textToArray } from '../../../utils/text-helpers';

const ReaderApp = ({ text, textLoading, textEnded, readerPaused, pauseReader, processTextToArray, loadTextStart, loadTextSuccess }) => {

  useEffect(() => {
    loadTextStart();
    processTextToArray(textToArray(text));
    loadTextSuccess();
  }, [processTextToArray, text, loadTextStart, loadTextSuccess]);

  const pause = () => {
    pauseReader();
  }

  return (
    <ReaderAppStyled>
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
    </ReaderAppStyled>
  )
}

const mapStateToProps = createStructuredSelector({
  textLoading: selectTextLoading,
  textEnded: selectTextEnded,
  readerPaused: selectReaderPaused, 
  text: selectText 
})

const mapDispatchToProps = dispatch => ({
  pauseReader: () => dispatch(pauseReading()),
  processTextToArray: text => dispatch(setTextArray(text)), 
  loadTextStart: () => dispatch(setLoadTextStart()),
  loadTextSuccess: () => dispatch(setLoadTextSuccess()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ReaderApp);
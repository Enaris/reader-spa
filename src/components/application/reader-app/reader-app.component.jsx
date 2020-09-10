import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './reader-app.styles.scss';
import { selectTextProcessing, selectTextEnded } from '../../../redux/reading/reading.selectors';
import { selectReaderPaused } from '../../../redux/reader/reader.selectors';
import ReaderText from '../reader-text/reader-text.component';
import ReaderWord from '../reader-word/reader-word.component';
import { pauseReading } from '../../../redux/reader/reader.actions';
import { ReaderAppStyled } from './reader-app.styled';

const ReaderApp = ({ textProcessing, textEnded, readerPaused, pauseReader }) => {

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
})

const mapDispatchToProps = dispatch => ({
  pauseReader: () => dispatch(pauseReading()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ReaderApp);
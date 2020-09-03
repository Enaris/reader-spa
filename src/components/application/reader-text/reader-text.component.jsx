import React from 'react';
import { connect } from 'react-redux';
import './reader-text.styles.scss';
import { selectTextArray, selectTextProcessing } from '../../../redux/reading/reading.selectors';
import { createStructuredSelector } from 'reselect';
import ReaderTextWord from '../reader-text-word/reader-text-word.component';
import { selectPartEnd } from '../../../redux/reader/reader.selectors';

const ReaderText = ({ textArray, currentEnd, textProcessing }) => {

  
  return (
    <div className='reader-text'>
      { !textProcessing &&
        textArray.map((word, i) => <ReaderTextWord wordObj={word} wIndex={ i } currentEnd={currentEnd} key={word.start} /> )
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  textArray: selectTextArray, 
  currentEnd: selectPartEnd, 
  textProcessing: selectTextProcessing
})

export default connect(mapStateToProps)(ReaderText);
import React from 'react';
import { connect } from 'react-redux';
import './reader-text.styles.scss';
import { selectTextArray } from '../../../redux/reading/reading.selectors';
import { createStructuredSelector } from 'reselect';
import { selectPartPosition } from '../../../redux/reader/reader.selectors';
import ReaderTextWord from '../reader-text-word/reader-text-word.component';

const ReaderText = ({ textArray, currentPos }) => {

  
  return (
    <div className='reader-text'>
      {
        textArray.map(word => <ReaderTextWord wordObj={word} cIndex={ currentPos } key={word.start} /> )
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentPos: selectPartPosition, 
  textArray: selectTextArray 
})

export default connect(mapStateToProps)(ReaderText);
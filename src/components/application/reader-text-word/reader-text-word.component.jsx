import React from 'react';
import { connect } from 'react-redux';
import './reader-text-word.styles.scss';
import { resumeReading, setPartInfoSuccess } from '../../../redux/reader/reader.actions';

const ReaderTextWord = ({ wordObj: { start, end, word }, wIndex, currentEnd, resume, changeCurrentWord }) => {

  const isInRange = () => currentEnd >= start && currentEnd <= end;
  const handleResume = () => {
    changeCurrentWord({ 
      word: "", 
      wordsIndexes: [ wIndex === 0 ? 0 : wIndex -1 ], 
      end: start === 0 ? 0 : start - 1, 
      lengthWithoutSpaces: 0 
    });
    resume();
  }

  return (
    <div>
      <span className={ `${isInRange() ? 'word-current' : ''} reader-text-word` } onClick={() => handleResume()} >
        {
          word
        }
      </span>
      <span>&nbsp;</span>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  changeCurrentWord: wordInfo => dispatch(setPartInfoSuccess(wordInfo)),
  resume: () => dispatch(resumeReading())
});

export default connect(null, mapDispatchToProps)(ReaderTextWord);
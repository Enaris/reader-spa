import React from 'react';
import { connect } from 'react-redux';
import './reader-text-word.styles.scss';
import { setWord, resumeReading } from '../../../redux/reader/reader.actions';

const ReaderTextWord = ({ wordObj: { start, end, word }, cIndex, resume, changeCurrentWord }) => {

  const isInRange = () => cIndex >= start && cIndex < end;
  const handleResume = () => {
    changeCurrentWord({ start: start - 1, length: 0, broken: false });
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
  changeCurrentWord: wordInfo => dispatch(setWord(wordInfo)),
  resume: () => dispatch(resumeReading())
});

export default connect(null, mapDispatchToProps)(ReaderTextWord);
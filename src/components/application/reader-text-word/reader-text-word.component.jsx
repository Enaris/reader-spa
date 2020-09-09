import React from 'react';
import { connect } from 'react-redux';
import './reader-text-word.styles.scss';
import { resumeReadingStart, setPartInfoSuccess } from '../../../redux/reader/reader.actions';

const ReaderTextWord = ({ wordObj: { start, end, word }, wIndex, currentEnd, resume, changeCurrentWord }) => {

  const isInRange = () => currentEnd >= start && currentEnd <= end;
  const handleResume = () => {
    
    resume(wIndex, start);
  }

  return (
    <>
      <div className={ `${isInRange() ? 'word-current' : ''} reader-text-word` } onClick={handleResume} >
        {
          word
        }
      </div>
      <span>&nbsp;</span>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  changeCurrentWord: wordInfo => dispatch(setPartInfoSuccess(wordInfo)),
  resume: (resumeAt, wordStart) => dispatch(resumeReadingStart(resumeAt, wordStart))
});

export default connect(null, mapDispatchToProps)(ReaderTextWord);
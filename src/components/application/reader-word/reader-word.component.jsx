import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './reader-word.styles.scss';
import { selectCurrentWord, selectPartPosition } from '../../../redux/reader/reader.selectors';
import { changeWordStart } from '../../../redux/reader/reader.actions';
import { createStructuredSelector } from 'reselect';

const ReaderWord = ({ word, changeWord, wordStart }) => {

  useEffect(() => {
    changeWord()
  }, [wordStart, changeWord])

  console.log(word);
  return (
    <div>
      { word }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  word: selectCurrentWord,
  wordStart: selectPartPosition
})

const mapDispatchToProps = dispatch => ({
  changeWord: () => dispatch(changeWordStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(ReaderWord);
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './reader-word.styles.scss';
import { selectCurrentWord, selectPartPosition, selectPartStr, selectPartEnd } from '../../../redux/reader/reader.selectors';
import { changeWordStart, setPartInfoStart } from '../../../redux/reader/reader.actions';
import { createStructuredSelector } from 'reselect';
import { ReaderWordStyled } from './reader-word.styled';

const ReaderWord = ({ word, changeWord, wordStart, part, partEnd, changePart }) => {
  // useEffect(() => {
  //   changeWord()
  // }, [wordStart, changeWord])

  useEffect(() => {
    changePart()
  }, [partEnd, changePart])

  //console.log(part);
  return (
    <ReaderWordStyled>
      <div className='word'>
        { part }
      </div>
    </ReaderWordStyled>
  )
}

const mapStateToProps = createStructuredSelector({
  // word: selectCurrentWord,
  // wordStart: selectPartPosition, 
  part: selectPartStr, 
  partEnd: selectPartEnd
})

const mapDispatchToProps = dispatch => ({
  // changeWord: () => dispatch(changeWordStart())
  changePart: () => dispatch(setPartInfoStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(ReaderWord);
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './reader-word.styles.scss';
import { selectPartStr, selectPartEnd } from '../../../redux/reader/reader.selectors';
import { setPartInfoStart } from '../../../redux/reader/reader.actions';
import { createStructuredSelector } from 'reselect';
import { ReaderWordStyled } from './reader-word.styled';

const ReaderWord = ({ part, partEnd, changePart }) => {
  
  useEffect(() => {
    changePart()
  }, [partEnd, changePart])


  return (
    <ReaderWordStyled>
      <div className='word'>
        { part }
      </div>
    </ReaderWordStyled>
  )
}

const mapStateToProps = createStructuredSelector({
  part: selectPartStr, 
  partEnd: selectPartEnd, 
})

const mapDispatchToProps = dispatch => ({
  changePart: () => dispatch(setPartInfoStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(ReaderWord);
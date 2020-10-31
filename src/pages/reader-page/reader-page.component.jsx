import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './reader-page.styles.scss';
import ReaderApp from '../../components/application/reader-app/reader-app.component';
import OptionBar from '../../components/general/option-bar/option-bar.component';
import { ReaderPageStyled } from './reader-page.styled';
import { createStructuredSelector } from 'reselect';
import { setTestMode } from '../../redux/reader/reader.actions';
import { selectReaderPaused, selectTestMode } from '../../redux/reader/reader.selectors';

const ReaderPage = ({ testMode, readerPaused, setTestMode }) => {

  const { location } = useHistory();
  useEffect(() => {
    setTestMode(location.pathname.indexOf('/reader/test') > -1);
  }, [setTestMode, location.pathname])

  return (
    <ReaderPageStyled>
      <ReaderApp /> 
      { !testMode && readerPaused &&
        <OptionBar />
      }
    </ReaderPageStyled>
  )
}

const mapStateToProps = createStructuredSelector({
  testMode: selectTestMode,
  readerPaused: selectReaderPaused

})
const mapDispatchToProps = dispatch => ({
  setTestMode: val => dispatch(setTestMode(val))
})
export default connect(mapStateToProps, mapDispatchToProps)(ReaderPage);
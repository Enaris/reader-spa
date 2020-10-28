import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './reader-new-text-page.styles.scss'
import ReaderNewTextForm from '../../components/forms/reader-new-text-form/reader-new-text-form.component';
import { setTestMode } from '../../redux/reader/reader.actions';

const ReaderNewTextPage = ({ setTestMode }) => {

  const { location } = useHistory();
  useEffect(() => {
    setTestMode(location.pathname.indexOf('/reader/new/test') > -1);
  }, [setTestMode, location.pathname])

  return (
    <div className='reader-new-text-page flex_wh100'>
      <ReaderNewTextForm />
    </div>
  )
}
const mapDispatchToProps = dispatch => ({
  setTestMode: val => dispatch(setTestMode(val))
})
export default connect(null, mapDispatchToProps)(ReaderNewTextPage);

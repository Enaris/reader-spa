import React, { useState } from 'react';
import './reader-options-form.styles.scss';
import ReaderThemeForm from '../reader-theme-form/reader-theme-form.component';
import { Button } from '@material-ui/core';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReaderSpeedForm from '../reader-speed-form/reader-speed-form.component';

const ReaderOptionsForm = () => {

  const [ showThemeForm, setShowThemeForm ] = useState(false);

  return (
    <div className='reader-options-form'>
      <div className='options-label'> OPTIONS </div>
      <Button 
        className='change-theme-btn'
        variant='outlined'
        color='primary'
        onClick={() => setShowThemeForm(!showThemeForm)}
      >
        <div className='change-theme-btn-text'>
          Change theme
          <FontAwesomeIcon icon={faAdjust} className='ml5' />
        </div>
      </Button>
      {
        showThemeForm &&
        <ReaderThemeForm />
      }
      <ReaderSpeedForm />
    </div>
  )
}

export default ReaderOptionsForm;
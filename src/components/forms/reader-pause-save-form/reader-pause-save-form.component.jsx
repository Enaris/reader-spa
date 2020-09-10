import React, { useState } from 'react';
import './reader-pause-save-form.styles.scss';
import { FormControlLabel, Switch, Button } from '@material-ui/core';

const ReaderPauseSaveForm = ({ onSave, onResume }) => {

  const [saveSessionResumingReading, setSaveSessionResumingReading] = useState(false);

  return (
    <div className='reader-pause-save-form'>
      <Button
        onClick={() => onSave()}
      >
        SAVE SESSION
      </Button>
      <Button
        onClick={() => onResume(saveSessionResumingReading)}
      >
        RESUME READING
      </Button>
      <FormControlLabel
        value={ saveSessionResumingReading }
        onChange={ e => setSaveSessionResumingReading(e.target.checked) }
        control={<Switch color='primary' checked={ saveSessionResumingReading } />} 
        label='Save session resuming reading'
      />
    </div>
  )
}

export default ReaderPauseSaveForm;
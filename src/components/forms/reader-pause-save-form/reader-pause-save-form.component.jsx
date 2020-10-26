import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './reader-pause-save-form.styles.scss';
import { FormControlLabel, Switch, Button } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { selectSessionSaved } from '../../../redux/reading-session/reading-session.selectors';
import WSpinner from '../../general/spinner/w-spinner/w-spinner.component';

const ReaderPauseSaveForm = ({ onSave, onResume, sessionSaved, resumeOnly }) => {

  const [saveSessionResumingReading, setSaveSessionResumingReading] = useState(false);

  return (
    <div className='reader-pause-save-form'>
      { !resumeOnly &&
        <Button
          onClick={() => {
            if (!sessionSaved) {
              onSave();
            }
          }}
          disabled={ sessionSaved }
        >
          { sessionSaved ? 'Session saved' : 'Save session' }
        </Button>
      }
      <Button
        onClick={() => onResume(saveSessionResumingReading)}
      >
        RESUME READING
      </Button> 
      { !resumeOnly &&
        <FormControlLabel
          value={ saveSessionResumingReading }
          onChange={ e => setSaveSessionResumingReading(e.target.checked) }
          control={<Switch color='primary' checked={ saveSessionResumingReading } />} 
          label='Save session resuming reading'
        />
      }
      
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  sessionSaved: selectSessionSaved, 
})

// export default connect(mapStateToProps)(ReaderPauseSaveForm);
export default compose(
  connect(mapStateToProps), 
  WSpinner
)(ReaderPauseSaveForm);
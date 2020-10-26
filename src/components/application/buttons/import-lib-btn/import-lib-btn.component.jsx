import React, { useState } from 'react';
import './import-lib-btn.styles.scss';
import { connect } from 'react-redux';
import { setOfflineLib } from '../../../../redux/offline-library/offline-lib.actions';
import YNModal from '../../../general/y-n-modal/y-n-modal.component';
import { Button } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';


const ImportLibBtn = ({ setOfflineLib }) => {

  const [ confirmImportOpen, setConfirmImportOpen ] = useState(false);
  const [ libFile, setLibFile ] = useState(null);

  const handleDrop = files => {
    setLibFile(files[0]);
    setConfirmImportOpen(true);
  }

  const importLib = () => {
    var fileReader = new FileReader();
    fileReader.onloadend = () => {
      setOfflineLib(JSON.parse(fileReader.result));
    }
    fileReader.readAsText(libFile);
  }

  const { getInputProps } = useDropzone({
    accept: 'application/json',
    onDrop: handleDrop,
    multiple: false,
  }); 

  return (
    <div className='import-lib-btn-container'>
      <React.Fragment>
        <input
          { ...getInputProps() }
          style={{ display: 'none' }}
          id="raised-button-file"
        />
        <label htmlFor="raised-button-file">
          <Button
            variant='outlined'
            color='primary' 
            component="span"
          >
            Import
          </Button>
        </label> 
      </React.Fragment>
      <YNModal
        open={ confirmImportOpen }
        onClose={ () => { setConfirmImportOpen(false) }}
        onNo={ () => { setConfirmImportOpen(false) }}
        onYes={ () => { setConfirmImportOpen(false); importLib(); }}
        label="Current library will be overwritten. Are you sure?"
        warning={ true }
      />
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setOfflineLib: lib => dispatch(setOfflineLib(lib))
});

export default connect(null, mapDispatchToProps)(ImportLibBtn);
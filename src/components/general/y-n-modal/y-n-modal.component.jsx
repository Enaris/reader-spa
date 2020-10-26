import React from 'react';
import './y-n-modal.styles.scss'
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';

const YNModal = ({ open, onClose, onYes, onNo, label = "Are you sure?", warning = false }) => {

  return (
    <div className='y-n-modal'>
      <Dialog
        open={ open }
        onClose={ onClose }
      >
        <DialogTitle className={ warning ? 'errors' : '' }> { label } </DialogTitle>
        <DialogActions>
          <Button onClick={ onYes } color="primary">
            Yes
          </Button>
          <Button onClick={ onNo } color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default YNModal;
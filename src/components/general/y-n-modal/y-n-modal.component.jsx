import React from 'react';
import './y-n-modal.styles.scss'
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core';

const YNModal = ({ open, onClose, onYes, onNo }) => {

  return (
    <div className='y-n-modal'>
      <Dialog
        open={ open }
        onClose={ onClose }
      >
        <DialogTitle> Are you sure? </DialogTitle>
        <DialogContent>
          <Button onClick={ onYes } color="primary">
            Yes
          </Button>
          <Button onClick={ onNo } color="primary" autoFocus>
            No
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default YNModal;
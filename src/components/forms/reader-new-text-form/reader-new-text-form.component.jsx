import React, { useState } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import './reader-new-text-form.styles.scss'
import { processTextStart, setReadingId } from '../../../redux/reading/reading.actions';
import { useHistory } from 'react-router-dom';

const ReaderNewTextForm = ({ processText }) => {

  const { push } = useHistory();
  const [ newText, setNewText ] = useState();

  return (
    <div className='reader-new-text-form p5'>
      <h3 className='mb5'>Insert text to read: </h3>
      <div className='min-vw50'>
        <TextField 
          value={ newText }
          onChange={ (e) => setNewText(e.target.value) }
          fullWidth 
          label='Text' 
          multiline 
          rows={10} 
          rowsMax={10} 
          variant='outlined' 
          color='primary'
        />
      </div>
      <Button
        disabled={ !newText }
        onClick={ () => {
          if (newText) {
            setReadingId(null);
            processText(newText);
            push( '/reader' );
          } 
        }}
      >
        READ
      </Button>
      <Button
        onClick={ () => {
          push('/text/add', { newText: newText });
        }}
      >
        SAVE
      </Button>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  processText: text => dispatch(processTextStart(text)),
  setReadingId: readingId => dispatch(setReadingId(readingId)) 
})

export default connect(null, mapDispatchToProps)(ReaderNewTextForm);
import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import './reader-new-text-form.styles.scss'
import { processTextStart, setReadingId } from '../../../redux/reading/reading.actions';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectTestMode } from '../../../redux/reader/reader.selectors';
import { Form, Formik } from 'formik';
import RField from '../../general/formik/RField/RField.component';
import validationSchema from './reader-new-text-form.validation';

const ReaderNewTextForm = ({ processText, testMode }) => {

  const { push } = useHistory();

  const handleSubmit = values => {
    const { newText } = values;
    if (newText) {
      setReadingId(null);
      processText(newText);
      push( testMode ? '/reader/test' : '/reader' );
    } 
  }

  return (
    <div className='reader-new-text-form p5'>
      <h3 className='mb5'>Insert text to read: </h3>
      { testMode &&
        <h5 className='mb5'>Use long text to better test yourself: </h5>
      }
      <Formik
        initialValues={{
          newText: ''
        }}
        validationSchema={ validationSchema }
        onSubmit={v => handleSubmit(v)}
      >
        { props => (
          <Form>
            <div className='min-vw50'>
            <RField 
              name='newText'
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
            type='submit'
          >
            READ
          </Button>
          { !testMode &&
            <Button
              onClick={ () => {
                push('/text/add', { newText: props.values.newText });
              }}
            >
              ADD NEW
            </Button>
          }
          </Form>
          
        )}
      </Formik>
      
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  processText: text => dispatch(processTextStart(text)),
  setReadingId: readingId => dispatch(setReadingId(readingId)) 
})

const mapStateToProps = createStructuredSelector({
  testMode: selectTestMode
})

export default connect(mapStateToProps, mapDispatchToProps)(ReaderNewTextForm);
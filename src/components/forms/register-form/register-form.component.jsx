import React, { useEffect } from 'react';
import './register-form.styles.scss';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import RField from '../../general/formik/RField/RField.component';
import { Button } from '@material-ui/core';
import validationSchema from './register-form.validation';
import { registerStart, setRegisterErrors } from '../../../redux/auth/auth.actions';
import { createStructuredSelector } from 'reselect';
import { selectRegisterErrors } from '../../../redux/auth/auth.selectors';
import FormErrors from '../../general/form-errors/form-errors.component';

const RegisterForm = ({ register, registerErrors, setRegisterErrors }) => {

  useEffect(() => {
    return () => {
      setRegisterErrors(null);
    };
  }, [setRegisterErrors]);

  return (
    <div >
      <h1 className='mb5'>Register</h1>
      <Formik 
        initialValues={{
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={ validationSchema }
        onSubmit={v => {register({email: v.email, password: v.password});}}
      >
        <Form className='register-form min-vw50'>
          <FormErrors 
            errors={ registerErrors }
            containerClass='mb5'
          />
          
          <RField containerClass='mb5' fullWidth name='email' label='Email' variant='outlined' />
          <RField containerClass='mb5' fullWidth name='password' label='Password' type='password' variant='outlined' />
          <RField containerClass='mb5' fullWidth name='confirmPassword' label='Confirm Password' type='password' variant='outlined' />
          <Button type='submit' variant='outlined'> Register </Button>
        </Form>
      </Formik>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  register: registerData => dispatch(registerStart(registerData)),
  setRegisterErrors: errors => dispatch(setRegisterErrors(errors))
})

const mapStateToProps = createStructuredSelector({
  registerErrors: selectRegisterErrors
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
import React from 'react';
import { connect } from 'react-redux';

import './login-form.styles.scss';
import { Formik, Form } from 'formik';
import RField from '../../general/formik/RField/RField.component';
import validationSchema from './login-form.validation';
import { Button } from '@material-ui/core';
import { loginStart } from '../../../redux/auth/auth.actions';

const LoginForm = ({ login }) => {

  return (
    <div className='login-form'>
      <Formik 
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={validationSchema}
        onSubmit={v => {console.log(v); login(v);}}
      >
        <Form>
          <RField name='email' label='Email' variant='outlined' />
          <RField name='password' label='Password' type='password' variant='outlined' />
          <Button type='submit' variant='outlined'> Login </Button>
        </Form>
      </Formik>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  login: loginData => dispatch(loginStart(loginData))
})

export default connect(null, mapDispatchToProps)(LoginForm);
import React from 'react';
import './register-form.styles.scss';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import RField from '../../general/formik/RField/RField.component';
import { Button } from '@material-ui/core';
import validationSchema from './register-form.validation';
import { registerStart } from '../../../redux/auth/auth.actions';

const RegisterForm = ({ register }) => {

  return (
    <div className='register-form'>
      <Formik 
        initialValues={{
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={v => {console.log(v); register({email: v.email, password: v.password});}}
      >
        <Form>
          <RField name='email' label='Email' variant='outlined' />
          <RField name='password' label='Password' type='password' variant='outlined' />
          <RField name='confirmPassword' label='Password' type='password' variant='outlined' />
          <Button type='submit' variant='outlined'> Login </Button>
        </Form>
      </Formik>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  register: registerData => dispatch(registerStart(registerData))
})

export default connect(null, mapDispatchToProps)(RegisterForm);
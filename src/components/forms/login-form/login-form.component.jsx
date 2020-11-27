import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './login-form.styles.scss';
import { Formik, Form } from 'formik';
import RField from '../../general/formik/RField/RField.component';
import validationSchema from './login-form.validation';
import { Button } from '@material-ui/core';
import { loginStart, setLoginErrors } from '../../../redux/auth/auth.actions';
import { selectLoginErrors } from '../../../redux/auth/auth.selectors';
import { createStructuredSelector } from 'reselect';
import FormErrors from '../../general/form-errors/form-errors.component';

const LoginForm = ({ login, loginErrors, containerClass, setLoginErrors }) => {

  useEffect(() => {
    return () => {
      setLoginErrors(null);
    };
  }, [setLoginErrors]);

  return (
    <div className={ `${containerClass ? containerClass : ''}` }>
      <h1>Login</h1>
      <Formik 
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={validationSchema}
        onSubmit={v => login(v)}
      >
        <Form className='login-form min-vw50'>
          <FormErrors
            errors={ loginErrors }
            containerClass='mb5'
          />
          <RField name='email' fullWidth containerClass='mb5' label='Email' variant='outlined' width='50vw' />
          <RField name='password' fullWidth containerClass='mb5' label='Password' type='password' variant='outlined' />
          <Button type='submit' variant='outlined'> Login </Button>
        </Form>
      </Formik>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  loginErrors: selectLoginErrors,
})

const mapDispatchToProps = dispatch => ({
  login: loginData => dispatch(loginStart(loginData)),
  setLoginErrors: errors => dispatch(setLoginErrors(errors))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
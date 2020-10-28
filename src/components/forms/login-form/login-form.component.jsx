import React from 'react';
import { connect } from 'react-redux';

import './login-form.styles.scss';
import { Formik, Form } from 'formik';
import RField from '../../general/formik/RField/RField.component';
import validationSchema from './login-form.validation';
import { Button } from '@material-ui/core';
import { loginStart } from '../../../redux/auth/auth.actions';
import { selectLoginErrors } from '../../../redux/auth/auth.selectors';
import { createStructuredSelector } from 'reselect';

const LoginForm = ({ login, loginErrors, containerClass }) => {

  return (
    <div className={ `${containerClass ? containerClass : ''}` }>
      <h1>Login</h1>
      <Formik 
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={validationSchema}
        onSubmit={v => {console.log(v); login(v);}}
      >
        <Form className='login-form min-vw50'>
        { loginErrors &&
          <div className='errors mb5'>
            <ul>
              {
                loginErrors.map(e => <li key={e.Key}>{e.Value}</li>)
              }
            </ul>
          </div>    
        }
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
  login: loginData => dispatch(loginStart(loginData))
  
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
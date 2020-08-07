import React from 'react';
import './register-form.styles.scss';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import RField from '../../general/formik/RField/RField.component';
import { Button } from '@material-ui/core';
import validationSchema from './register-form.validation';
import { registerStart } from '../../../redux/auth/auth.actions';
import { createStructuredSelector } from 'reselect';
import { selectRegisterErrors } from '../../../redux/auth/auth.selectors';

const RegisterForm = ({ register, registerErrors }) => {

  return (
    <div >
      <Formik 
        initialValues={{
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={v => {console.log(v); register({email: v.email, password: v.password});}}
      >
        <Form className='register-form min-vw50'>
          { registerErrors &&
            <div className='errors mb5'>
              <ul>
                {
                  registerErrors.map(e => <li key={e.code}>{e.description}</li>)
                }
              </ul>
            </div>    
          }
          
          <RField containerClass='mb5' fullWidth name='email' label='Email' variant='outlined' />
          <RField containerClass='mb5' fullWidth name='password' label='Password' type='password' variant='outlined' />
          <RField containerClass='mb5' fullWidth name='confirmPassword' label='Confirm Password' type='password' variant='outlined' />
          <Button type='submit' variant='outlined'> Login </Button>
        </Form>
      </Formik>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  register: registerData => dispatch(registerStart(registerData))
})

const mapStateToProps = createStructuredSelector({
  registerErrors: selectRegisterErrors
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
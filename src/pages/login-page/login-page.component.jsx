import React from 'react';
import './login-page.styles.scss';
import LoginForm from '../../components/forms/login-form/login-form.component';

const LoginPage = () => {

  return (
    <div className='login-page'>
      <LoginForm />
    </div>
  )
}

export default LoginPage;
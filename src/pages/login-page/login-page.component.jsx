import React from 'react';
import './login-page.styles.scss';
import LoginForm from '../../components/forms/login-form/login-form.component';

const LoginPage = () => {

  return (
    <div className='page-flex flex-center flex-column p5'>
      <h1>Login</h1>
      <LoginForm />
      <div>Or register</div>
    </div>
  )
}

export default LoginPage;
import React from 'react';
import './login-page.styles.scss';
import LoginForm from '../../components/forms/login-form/login-form.component';
import { Link } from 'react-router-dom';

const LoginPage = () => {

  return (
    <div className='page-flex flex-center flex-column p5'>
      <LoginForm containerClass='mb5'/>
      <Link
        className='simple-link'
        to='/register'
      >
        Or register
      </Link>
    </div>
  )
}

export default LoginPage;
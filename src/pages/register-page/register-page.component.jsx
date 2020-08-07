import React from 'react';
import './register-page.styles.scss';
import RegisterForm from '../../components/forms/register-form/register-form.component';

const RegisterPage = () => {

  return (
    <div className='page-flex flex-center flex-column p5'>
      <RegisterForm />
    </div>
  )
}

export default RegisterPage;
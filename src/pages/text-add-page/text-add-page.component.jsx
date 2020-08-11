import React from 'react';
import './text-add-page.styles.scss';
import TextAddForm from '../../components/forms/text-add-form/text-add-form.component';

const TextAddPage = ({ user }) => {

  return (
    <div className='page-flex flex-center flex-column p5'>
      <TextAddForm />
    </div>
  )
}

export default TextAddPage;
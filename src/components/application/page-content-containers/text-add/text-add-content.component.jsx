import React from 'react';
import { compose } from 'redux';
import './text-add-content.styles.scss';
import TextAddForm from '../../../forms/text-add-form/text-add-form.component';
import WSpinner from '../../../general/spinner/w-spinner/w-spinner.component';

const TextAddContent = ({ tags, isLoading }) => {

  return (
    <div className='flex_wh100 flex-column text-add-page'>
      <TextAddForm 
        tags={ tags }
      />
    </div>
  )
}

export default compose(
  WSpinner
)(TextAddContent);
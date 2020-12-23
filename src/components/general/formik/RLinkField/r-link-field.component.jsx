import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './r-link-field.styles.scss';
import { Field } from 'formik';

const RLinkField = ({ containerClass, ...props }) => {

  const modules = {
    toolbar: [
      ['link'],
    ],
  };
  

  return (
    <div className={`${containerClass ? containerClass : ''} r-link-filed`}>
      
      <Field name={ props.name }>
        { ({ field }) => <ReactQuill 
          { ...props }
          value={ field.value } 
          onChange={ field.onChange(field.name) } 
          theme="snow" 
          modules={ modules }
          /> }
      </Field>
    </div>
  )
}

export default RLinkField;
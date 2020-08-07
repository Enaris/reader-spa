import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

const RField = ({ containerClass, ...props  }) => {
  const [ field, meta ] = useField(props);
  return (
    <div className={ containerClass }>
      <TextField 
        {...field} 
        {...props} 
        error={ meta.touched && Boolean(meta.error) } 
        helperText={meta.error}
      />
    </div>
  )
}

export default RField;
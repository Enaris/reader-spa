import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

const RField = ({ ...props }) => {
  const [ field, meta ] = useField(props);
  return (
    <TextField {...field} {...props} error={ meta.touched && Boolean(meta.error) } helperText={meta.error}/>
  )
}

export default RField;
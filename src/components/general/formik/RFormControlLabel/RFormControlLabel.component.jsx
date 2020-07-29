import React from 'react';
import { FormControlLabel } from '@material-ui/core';
import { useField } from 'formik';

const RFormControlLabel = ({ ...props }) => {
  const [ field ] = useField(props);
  return (
    <FormControlLabel {...field} {...props} />
  )
}

export default RFormControlLabel;
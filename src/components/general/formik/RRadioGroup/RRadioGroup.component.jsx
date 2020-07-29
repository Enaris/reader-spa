import React from 'react';
import { RadioGroup } from '@material-ui/core';
import { useField } from 'formik';

const RRadioGroup = ({ children, ...props }) => {
  const [ field ] = useField(props);
  return (
    <RadioGroup {...field} {...props} >
      { children }
    </RadioGroup>
  )
}

export default RRadioGroup;
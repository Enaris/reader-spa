import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useField } from 'formik';

const RAutocomplete = ({ containerClass, ...props  }) => {
  const [ field, meta ] = useField(props);
  return (
    <div className={ containerClass }>
      <Autocomplete 
        {...field} 
        {...props} 
        error={ meta.touched && Boolean(meta.error) } 
        helperText={meta.error}
      />
    </div>
  )
}

export default RAutocomplete;
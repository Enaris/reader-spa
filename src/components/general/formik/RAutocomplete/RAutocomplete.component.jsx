import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useField } from 'formik';

const RAutocomplete = ({ containerClass, ...props  }) => {
  const [ field, meta, helpers ] = useField(props);
  const { setValue } = helpers;
  return (
    <div className={ containerClass }>
      <Autocomplete 
        {...field} 
        {...props} 

        onChange={(e, value) => setValue(value) }
      />
    </div>
  )
}

export default RAutocomplete;
import React from 'react';
import { compose } from 'redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import WSpinner from '../spinner/w-spinner/w-spinner.component';

const LoadingAutocomplete = ({ containerClass, isLoading, ...props  }) => {
  return (
    <div className={ containerClass }>
      <Autocomplete 
        {...props} 
      />
    </div>
  )
}

export default compose(
  WSpinner
)(LoadingAutocomplete);
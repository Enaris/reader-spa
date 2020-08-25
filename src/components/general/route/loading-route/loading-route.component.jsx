import React from 'react';
import { Route } from 'react-router-dom';
import { compose } from 'redux';
import WSpinner from '../../spinner/w-spinner/w-spinner.component';


const LoadingRoute = ({ 
  isLoading,
  ...otherProps }) => {

  return (
    <Route 
      { ...otherProps }
    />
  )
}

export default compose(
  WSpinner
)(LoadingRoute);
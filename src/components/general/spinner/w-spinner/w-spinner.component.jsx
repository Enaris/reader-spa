import React from 'react';
import SpinnerOverlay from '../spinner-overlay/spinner-overlay.component';

const WSpinner = WrappedComponent => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay />
    ) : (
      <WrappedComponent { ...otherProps } />
    );
  };
  return Spinner;
};

export default WSpinner;
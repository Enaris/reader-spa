import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import WSpinner from '../../spinner/w-spinner/w-spinner.component';
import { selectCurrentUser } from '../../../../redux/auth/auth.selectors';


const NonAuthRoute = ({ 
  user, 
  redirectTo, 
  Component, 
  isLoading,
  ...otherProps }) => {

  return (
    <Route 
      { ...otherProps }
      render={() =>
        !user 
        ? <Component /> 
        : <Redirect to={ redirectTo } />
      }
    />
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default compose(
  connect(mapStateToProps), 
  WSpinner
)(NonAuthRoute);
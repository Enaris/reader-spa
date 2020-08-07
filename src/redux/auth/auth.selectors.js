import { createSelector } from 'reselect';

const selectAuth = state => state.auth;

export const selectUser = createSelector(
  [selectAuth], 
  auth => auth.user
)

export const selectRegisterErrors = createSelector(
  [selectAuth],
  auth => auth.registerErrors
)

export const selectLoginErrors = createSelector(
  [selectAuth],
  auth => auth.loginErrors
)

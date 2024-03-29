import AuthActionTypes from './auth.types';

export const loginStart = loginData => ({
  type: AuthActionTypes.LOGIN_START, 
  payload: loginData
})

export const loginSuccess = loginResult => ({
  type: AuthActionTypes.LOGIN_SUCCESS, 
  payload: loginResult
})

export const loginFailure = error => ({
  type: AuthActionTypes.LOGIN_FAILURE, 
  payload: error
})

export const registerStart = registerData => ({
  type: AuthActionTypes.REGISTER_START, 
  payload: registerData
})

export const registerSuccess = registerResult => ({
  type: AuthActionTypes.REGISTER_SUCCESS, 
  payload: registerResult
})

export const registerFailure = error => ({
  type: AuthActionTypes.REGISTER_FAILURE, 
  payload: error
})

export const checkTokenStart = token => ({
  type: AuthActionTypes.CHECK_TOKEN_START, 
  payload: token
})

export const checkTokenSuccess = loginResult => ({
  type: AuthActionTypes.CHECK_TOKEN_SUCCESS, 
  payload: loginResult
})

export const checkTokenFailure = () => ({
  type: AuthActionTypes.CHECK_TOKEN_FAILURE
})

export const logout = () => ({
  type: AuthActionTypes.LOGOUT
})

export const setLoginErrors = errors => ({
  type: AuthActionTypes.SET_LOGIN_ERRORS,
  payload: errors
})

export const setRegisterErrors = errors => ({
  type: AuthActionTypes.SET_REGISTER_ERRORS,
  payload: errors
})


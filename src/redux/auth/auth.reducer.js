import AuthActionTypes from './auth.types';

const INITIAL_STATE = {

  loggingIn: false, 
  registerOngoing: false, 

  user: null, 
  token: null, 

  loginErrors: [], 
  registerErrors: []
}

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case AuthActionTypes.REGISTER_START: 
      return {
        ...state,
        registerOngoing: false, 
        registerErrors: [] 
      }
    case AuthActionTypes.REGISTER_SUCCESS: 
      return {
        ...state, 
        registerOngoing: false, 
        registerErrors: []
      }
    case AuthActionTypes.REGISTER_FAILURE: 
      return {
        ...state, 
        registerOngoing: false, 
        registerErrors: action.payload
      }
    
    case AuthActionTypes.LOGIN_START: 
      return {
        ...state,
        loggingIn: false, 
        loginErrors: [] 
      }
    case AuthActionTypes.LOGIN_SUCCESS: 
      return {
        ...state, 
        loggingIn: false, 
        user: action.payload, 
        loginErrors: []
      }
    case AuthActionTypes.LOGIN_FAILURE: 
      return {
        ...state, 
        registerOngoing: false, 
        loginErrors: action.payload
      }

    default:
      return state;
  }
}

export default AuthReducer;
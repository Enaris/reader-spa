import axios from 'axios';
import AuthActionTypes from './auth.types';

const INITIAL_STATE = {

  loggingIn: false, 
  registerOngoing: false, 

  user: null, 
  token: null, 

  loginErrors: [], 
  registerErrors: [], 

  checkingToken: false
}

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case AuthActionTypes.REGISTER_START: 
      return {
        ...state,
        registerOngoing: true, 
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
        loggingIn: true, 
        loginErrors: [] 
      }
    case AuthActionTypes.LOGIN_SUCCESS:
      const { aspUserId, email, token } = action.payload; 
      return {
        ...state, 
        loggingIn: false, 
        user: { aspUserId, email },
        token: token, 
        loginErrors: []
      }
    case AuthActionTypes.LOGIN_FAILURE: 
      return {
        ...state, 
        loggingIn: false, 
        loginErrors: action.payload
      }

    case AuthActionTypes.LOGOUT:
      sessionStorage.removeItem("token");
      axios.defaults.headers.common = {
        'Authorization': ''
      };
      return {
        ...state, 
        loggingIn: false, 
        user: null,
        token: null, 
        loginErrors: []
      }

    case AuthActionTypes.CHECK_TOKEN_START: 
      return {
        ...state, 
        checkingToken: true,
      }
    case AuthActionTypes.CHECK_TOKEN_SUCCESS: 
      return {
        ...state, 
        checkingToken: false,
        user: { aspUserId: action.payload.aspUserId, email: action.payload.email },
        token: action.payload.token, 
      }
    case AuthActionTypes.CHECK_TOKEN_FAILURE: 
      return {
        ...state, 
        checkingToken: false,
        user: null,
        token: null
      }  

    default:
      return state;
  }
}

export default AuthReducer;
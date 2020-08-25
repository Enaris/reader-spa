import { call, all, put, takeLatest } from 'redux-saga/effects';

import AuthActionTypes from './auth.types';
import axios from 'axios';
import { loginUrl, registerUrl, checkTokenUrl } from '../../utils/api-urls';
import { loginSuccess, loginFailure, registerSuccess, registerFailure, loginStart, checkTokenSuccess, checkTokenFailure } from './auth.actions';
import { push } from 'connected-react-router';

export function* login({ payload }) {
  try {
    const result = yield call(axios.post, loginUrl, payload)
    yield put(loginSuccess(result.data));
    sessionStorage.setItem("token", result.data.token);
    axios.defaults.headers.common = {
      'Authorization': `Bearer ${ result.data.token }`
    };
    yield put(push('/'));
  }
  catch (e) {
    yield put(loginFailure(e.response.data));
  }
}

export function* register({ payload }) {
  
  try {
    const result = yield call(axios.post, registerUrl, payload)
    yield put(registerSuccess(result));

    yield put(loginStart({ email: payload.email, password: payload.password }));
  }
  catch (e) {
    yield put(registerFailure(e.response.data));
  }
}

export function* checkToken({ payload }) {

  if (payload === null) {
    yield put(checkTokenFailure());
    return;
  }  

  try {
    const result = yield call(axios.post, checkTokenUrl(payload));
    yield put(checkTokenSuccess(result.data));
    sessionStorage.setItem("token", result.data.token);
    axios.defaults.headers.common = {
      'Authorization': `Bearer ${ result.data.token }`
    };
  }
  catch {
    yield put(checkTokenFailure());
  }
}

export function* onLogin() {
  yield takeLatest(AuthActionTypes.LOGIN_START, login);
}

export function* onRegister() {
  yield takeLatest(AuthActionTypes.REGISTER_START, register)
}

export function* onCheckToken() {
  yield takeLatest(AuthActionTypes.CHECK_TOKEN_START, checkToken);
}

export default function* AuthSagas() {
  yield all([
    call(onLogin),
    call(onRegister), 
    call(onCheckToken) 
  ])
}
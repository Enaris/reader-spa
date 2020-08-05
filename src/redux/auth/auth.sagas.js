import { call, all, put, takeLatest } from 'redux-saga/effects';

import AuthActionTypes from './auth.types';
import axios from 'axios';
import { loginUrl, registerUrl } from '../../utils/api-urls';
import { loginSuccess, loginFailure, registerSuccess, registerFailure } from './auth.actions';

export function* login({ payload }) {
  try {
    const result = yield call(axios.post, loginUrl, payload)
    console.log(result);
    yield put(loginSuccess(result));
  }
  catch (e) {
    console.log(e);
    yield put(loginFailure(e));
  }
}

export function* register({ payload }) {
  
  console.log(registerUrl);
  try {
    const result = yield call(axios.post, registerUrl, payload)
    console.log(result);
    yield put(registerSuccess(result));
  }
  catch (e) {
    console.log(e);
    yield put(registerFailure(e));
  }
}

export function* onLogin() {
  yield takeLatest(AuthActionTypes.LOGIN_START, login);
}

export function* onRegister() {
  yield takeLatest(AuthActionTypes.REGISTER_START, register)
}

export default function* AuthSagas() {
  yield all([
    call(onLogin),
    call(onRegister) 
  ])
}
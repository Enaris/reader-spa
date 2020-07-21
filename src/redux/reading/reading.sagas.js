import { call, all, takeLatest } from 'redux-saga/effects';

import ReadingActionTypes from './reading.types';

export function* test() {
  yield console.log("test");
}

export function* onTest() {
  yield takeLatest(ReadingActionTypes.SET_TEXT, test);
}

export default function* ReadingSagas() {
  yield all([
    call(onTest)
  ])
}
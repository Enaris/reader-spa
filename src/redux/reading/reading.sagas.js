import { call, all, put, takeLatest } from 'redux-saga/effects';

import ReadingActionTypes from './reading.types';
import { setTextArray, processTextSuccess, setText, setTextArrayRowIndexes } from './reading.actions';
import { textToArray, textArrayToArrayOfRows } from '../../utils/text-helpers';
import { resetReader } from '../reader/reader.actions';

export function* processText({ payload }) {

  yield put(resetReader());
  const textArray = yield call(textToArray, payload);
  yield put(setText(payload));
  yield put(setTextArray(textArray));
  
  const l = yield call(textArrayToArrayOfRows, textArray, 63);
  const m = yield call(textArrayToArrayOfRows, textArray, 52);
  const s = yield call(textArrayToArrayOfRows, textArray, 35);
  yield put(setTextArrayRowIndexes({ l, m, s }));

  yield put(processTextSuccess());
}


export function* onProcessTextStart() {
  yield takeLatest(ReadingActionTypes.PROCESS_TEXT_START, processText);
}

export default function* ReadingSagas() {
  yield all([
    call(onProcessTextStart)
  ])
}
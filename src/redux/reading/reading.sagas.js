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
  
  const rowIndexes = yield call(textArrayToArrayOfRows, textArray, 50);
  yield put(setTextArrayRowIndexes(rowIndexes));

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
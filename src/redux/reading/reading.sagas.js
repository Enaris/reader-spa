import { call, all, put, select, takeLatest } from 'redux-saga/effects';

import ReadingActionTypes from './reading.types';
import { setTextArray, processTextSuccess, setText } from './reading.actions';
import { textToArray } from '../../utils/text-helpers';
import { resetReader } from '../reader/reader.actions';
//import { selectText } from './reading.selectors';

export function* processText({ payload }) {

  console.log(payload);
  yield put(resetReader());
  const textArray = yield call(textToArray, payload);
  yield put(setText(payload));
  yield put(setTextArray(textArray));
  
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
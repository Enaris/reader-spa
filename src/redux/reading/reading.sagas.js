import { call, all, put, select, takeLatest } from 'redux-saga/effects';

import ReadingActionTypes from './reading.types';
import { setTextArray, processTextSuccess } from './reading.actions';
import { textToArray } from '../../utils/text-helpers';
import { selectText } from './reading.selectors';

export function* processText() {

  const text = yield select(selectText);
  
  const textArray = yield call(textToArray, text);
  
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
import { call, all, takeLatest, put, select } from 'redux-saga/effects';
import { findNextWord } from '../../utils/reader-helpers';

import ReaderActionTypes from './reader.types';
import { selectPartPosition, selectPartLength } from './reader.selectors';
import { selectTextEnded, selectText } from '../reading/reading.selectors';
import { setTextEnded } from '../reading/reading.actions';
import { selectWordOptions, selectInitialSpeeds } from '../reader-options/reader-options.selectors';
import { setWord, changeWordSuccess } from './reader.actions';
import { timeout } from '../../utils/w-delay';
import { wpmToWaitMs, cpmToWaitMs } from '../../utils/wpm-cmp-helpers';

export function* changeWord() {

  const t0 = performance.now();
  const textEnded = yield select(selectTextEnded);
  
  if (textEnded)
    return;
  
  var oldStart = yield select(selectPartPosition);
  if (oldStart === -1)
  oldStart = 0;
  
  var oldLength = yield select(selectPartLength);
  if (oldLength === -1) {
    yield put(setTextEnded())
    return;
  }

  const allText = yield select(selectText);
  const wordOptions = yield select(selectWordOptions);

  const { start, length, broken } = yield call(findNextWord, oldStart, oldLength, allText, wordOptions);

  if (length === -1) {
    yield put(setTextEnded());
    return;
  }
  const speeds = yield select(selectInitialSpeeds);
  const wait = speeds.wpm > 0 ? wpmToWaitMs(speeds.wpm) : cpmToWaitMs(speeds.cpm, oldLength);

  yield call(timeout, wait);
  yield put(setWord({ start, length, broken }));
  yield put(changeWordSuccess());
  const t1 = performance.now();
  console.log(t1 - t0);
  console.log(wait);
}

export function* onChangeWord() {
  yield takeLatest(ReaderActionTypes.CHANGE_WORD_START, changeWord);
}

export default function* ReaderSagas() {
  yield all([
    call(onChangeWord)
  ])
}
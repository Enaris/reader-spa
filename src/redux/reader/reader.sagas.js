import { call, all, takeLatest, put, select } from 'redux-saga/effects';
import { getNextPart } from '../../utils/reader-helpers';

import ReaderActionTypes from './reader.types';
import { selectPartPosition, selectPartLength, selectReaderPaused, selectPartEnd, selectPartIndexes } from './reader.selectors';
import { selectTextEnded, selectText, selectTextArray } from '../reading/reading.selectors';
import { setTextEnded } from '../reading/reading.actions';
import { selectWordOptions, selectInitialSpeeds } from '../reader-options/reader-options.selectors';
import { setWord, changeWordSuccess, setPartInfoSuccess, setWordLength } from './reader.actions';
import { timeoutWToken } from '../../utils/w-delay';
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

  //yield call(timeout, wait);
  var cancelToken = {};
  yield call(timeoutWToken, wait, cancelToken);

  const paused = yield select(selectReaderPaused);
  if (paused) {
    yield call(cancelToken.cancel);
    return;
  }
  yield put(setWord({ start, length, broken }));
  yield put(changeWordSuccess());
  const t1 = performance.now();
  console.log(t1 - t0);
  console.log(wait);
}

export function* onChangeWord() {
  yield takeLatest(ReaderActionTypes.CHANGE_WORD_START, changeWord);
}

export function* changePart() {
  const textEnded = yield select(selectTextEnded);
  
  if (textEnded)
    return;

  var oldEnd = yield select(selectPartEnd);
  if (oldEnd === -1) {
    yield put(setTextEnded());
    return;
  }

  const textArray = yield select(selectTextArray);
  const wordOptions = yield select(selectWordOptions);
  const oldIndexes = yield select(selectPartIndexes);
  const { 
    word, 
    wordsIndexes, 
    end, 
    lengthWithoutSpaces 
  } = yield call(getNextWord, oldIndexes, oldEnd, textArray, wordOptions);
  
  const speeds = yield select(selectInitialSpeeds);
  const length = yield select(selectPartLength);
  const wait = speeds.wpm > 0 ? wpmToWaitMs(speeds.wpm) : cpmToWaitMs(speeds.cpm, length);

  console.log(wait);
  console.log(length);
  var cancelToken = {};
  yield call(timeoutWToken, wait, cancelToken);

  const paused = yield select(selectReaderPaused);
  if (paused) {
    yield call(cancelToken.cancel);
    return;
  }

  yield put(setWordLength(lengthWithoutSpaces));
  yield put(setPartInfoSuccess({ word, wordsIndexes, end }));
  
  if (end === -1) {
    yield put(setTextEnded());
    return;
  }
}

export function* onChangePart() {
  yield takeLatest(ReaderActionTypes.SET_PART_INFO_START, changePart);
}

export default function* ReaderSagas() {
  yield all([
    call(onChangeWord),
    call(onChangePart)
  ])
}
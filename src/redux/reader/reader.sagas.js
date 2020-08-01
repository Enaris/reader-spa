import { call, all, takeLatest, put, select } from 'redux-saga/effects';
import { getNextPart } from '../../utils/reader-helpers';

import ReaderActionTypes from './reader.types';
import { selectPartLength, selectReaderPaused, selectPartEnd, selectPartIndexes } from './reader.selectors';
import { selectTextEnded, selectTextArray } from '../reading/reading.selectors';
import { setTextEnded } from '../reading/reading.actions';
import { selectWordOptions, selectInitialSpeeds } from '../reader-options/reader-options.selectors';
import { setPartInfoSuccess } from './reader.actions';
import { timeoutWToken } from '../../utils/w-delay';
import { wpmToWaitMs, cpmToWaitMs } from '../../utils/wpm-cmp-helpers';

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
  } = yield call(getNextPart, oldIndexes, oldEnd, textArray, wordOptions);
  
  const speeds = yield select(selectInitialSpeeds);
  const length = yield select(selectPartLength);
  const wait = speeds.wpm > 0 ? wpmToWaitMs(speeds.wpm) : cpmToWaitMs(speeds.cpm, length);

  var cancelToken = {};
  yield call(timeoutWToken, wait, cancelToken);

  const paused = yield select(selectReaderPaused);
  if (paused) {
    yield call(cancelToken.cancel);
    return;
  }

  yield put(setPartInfoSuccess({ word, wordsIndexes, end, lengthWithoutSpaces }));
  
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
    call(onChangePart)
  ])
}
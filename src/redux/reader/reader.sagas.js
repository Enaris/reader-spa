import { call, all, takeLatest, put, select } from 'redux-saga/effects';
import { getNextPart } from '../../utils/reader-helpers';

import ReaderActionTypes from './reader.types';
import { selectPartLength, selectReaderPaused, selectPartEnd, selectPartIndexes, selectCurrentSpeed, selectReadingTime, selectSlow } from './reader.selectors';
import { selectTextEnded, selectTextArray } from '../reading/reading.selectors';
import { setTextEnded } from '../reading/reading.actions';
import { selectWordOptions, selectSpeedOptions, selectSpeed } from '../reader-options/reader-options.selectors';
import { setPartInfoSuccess, setCurrentSpeed, setReadingTime, setSlow, resumeReadingSucees } from './reader.actions';
import { timeoutWToken } from '../../utils/w-delay';
import { wpmToWaitMs, cpmToWaitMs } from '../../utils/wpm-cmp-helpers';
import { getSpeedIncreaseByTarget, getSpeedIncrease, doSlowDown } from '../../utils/read-speed-helpers';

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
  
  const speedOptions = yield select(selectSpeedOptions);
  const useWPM = speedOptions.initialWPM > 0;
  const doIniAcceleration = speedOptions.targetCPM > 0 || speedOptions.targetWPM > 0;
  const doConstAcceleration = speedOptions.addPerMin > 0;

  var currentSpeed = yield select(selectCurrentSpeed);
  if (currentSpeed === null)
    currentSpeed = {
      speed: useWPM ? speedOptions.initialWPM : speedOptions.initialCPM,
      type: useWPM ? 'wpm' : 'cpm'
    };
  
  const length = yield select(selectPartLength);
  const slowThisWord = yield select(selectSlow);
  var usedSpeed =  currentSpeed.speed;
  if (slowThisWord) {
    usedSpeed = speedOptions.slowTo;
    yield put(setSlow(false));
  }
  
  var wait = useWPM ? wpmToWaitMs(usedSpeed) : cpmToWaitMs(usedSpeed, length);
  const readingTime = yield select(selectReadingTime);

  var cancelToken = {};
  const paused = yield select(selectReaderPaused);
  if (paused) {
    yield call(cancelToken.cancel);
    return;
  }

  if (length === 0) {
    wait = 0;
  } 
  yield call(timeoutWToken, wait, cancelToken);
  const newReadingTime = readingTime + wait;
  yield put(setReadingTime(newReadingTime));

  yield put(setPartInfoSuccess({ word, wordsIndexes, end, lengthWithoutSpaces }));

  var newSpeed = currentSpeed.speed;
  if (doIniAcceleration && newReadingTime / 1000 < speedOptions.initialAccelerationTimeSecs) {
    newSpeed += getSpeedIncreaseByTarget({ 
      options: {
        initialSpeed: useWPM ? speedOptions.initialWPM : speedOptions.initialCPM, 
        targetSpeed: useWPM ? speedOptions.targetWPM : speedOptions.targetCPM, 
        accTimeSecs: speedOptions.initialAccelerationTimeSecs
      }, timeMs: wait
    });
  }
  else if ((doConstAcceleration && !doIniAcceleration)   
    || (doConstAcceleration && doIniAcceleration && readingTime / 1000 > speedOptions.initialAccelerationTimeSecs)) {
      newSpeed += getSpeedIncrease({ accelerationPerMin: speedOptions.addPerMin, timeMs: wait});
  }

  const doSlow = doSlowDown(speedOptions.slowIfLonger, lengthWithoutSpaces);

  if (doSlow) {
    yield put(setSlow(true));
  }

  if (newSpeed !== currentSpeed.speed) {
    yield put(setCurrentSpeed({ speed: newSpeed, type: currentSpeed.type }));
  }

  if (end === -1) {
    yield put(setTextEnded());
    return;
  }
}

export function* resumeReading() {
  
  const speed = yield select(selectSpeed);
  yield put(setCurrentSpeed(speed));

  yield put(resumeReadingSucees);
}

export function* onChangePart() {
  yield takeLatest(ReaderActionTypes.SET_PART_INFO_START, changePart);
}

export function* onResumeReading() {
  yield takeLatest(ReaderActionTypes.RESUME_READING_START, resumeReading);
}

export default function* ReaderSagas() {
  yield all([
    call(onChangePart), 
    call(onResumeReading)
  ])
}
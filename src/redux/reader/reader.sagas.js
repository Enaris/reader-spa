import { call, all, takeLatest, put, select } from 'redux-saga/effects';
import { getNextPart } from '../../utils/reader-helpers';

import ReaderActionTypes from './reader.types';
import { selectPartLength, selectReaderPaused, selectPartEnd, selectPartIndexes, selectCurrentSpeed, selectReadingTime, selectSlow } from './reader.selectors';
import { selectTextEnded, selectTextArray } from '../reading/reading.selectors';
import { setTextEnded } from '../reading/reading.actions';
import { selectWordOptions, selectSpeedOptions, selectInitialSpeed } from '../reader-options/reader-options.selectors';
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
  const initialSpeed = yield select(selectInitialSpeed);

  var currentSpeed = yield select(selectCurrentSpeed);
  if (currentSpeed === null)
    currentSpeed = {
      speed: initialSpeed.speed,
      type: initialSpeed.type
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

  if (length === 0) {
    wait = 0;
  } 
  var cancelToken = {};

  yield call(timeoutWToken, wait, cancelToken);
  
  const paused = yield select(selectReaderPaused);
  if (paused) {
    yield call(cancelToken.cancel);
    return;
  }
  
  yield put(setPartInfoSuccess({ word, wordsIndexes, end, lengthWithoutSpaces }));
  const newReadingTime = readingTime + wait;
  yield put(setReadingTime(newReadingTime));

  var newSpeed = currentSpeed.speed;
  if (doIniAcceleration && newReadingTime / 1000 < speedOptions.initialAccelerationTimeSecs) {
    const x = getSpeedIncreaseByTarget({ 
      options: {
        initialSpeed: initialSpeed.speed, 
        targetSpeed: useWPM ? speedOptions.targetWPM : speedOptions.targetCPM, 
        accTimeSecs: speedOptions.initialAccelerationTimeSecs
      }, timeMs: newReadingTime
    });
    newSpeed = initialSpeed.speed + x;
  }
  else if ((doConstAcceleration && !doIniAcceleration)   
    || (doConstAcceleration && doIniAcceleration && readingTime / 1000 > speedOptions.initialAccelerationTimeSecs)) {
      newSpeed = initialSpeed.speed + getSpeedIncrease({ accelerationPerMin: speedOptions.addPerMin, timeMs: newReadingTime});
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
  
  yield put(resumeReadingSucees());
  const speed = yield select(selectInitialSpeed);
  yield put(setCurrentSpeed(speed));

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
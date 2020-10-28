import { call, all, takeLatest, put, select } from 'redux-saga/effects';
import { getNextPart } from '../../utils/reader-helpers';

import ReaderActionTypes from './reader.types';
import { selectPartLength, selectReaderPaused, selectPartEnd, selectPartIndexes, selectCurrentSpeed, selectReadingTime, selectSlow } from './reader.selectors';
import { selectTextEnded, selectTextArray, selectReadingId } from '../reading/reading.selectors';
import { setTextEnded } from '../reading/reading.actions';
import { selectWordOptions, selectSpeedOptions, selectInitialSpeed } from '../reader-options/reader-options.selectors';
import { setPartInfoSuccess, setCurrentSpeed, setReadingTime, setSlow, resumeReadingSucees, pauseReading } from './reader.actions';
import { timeoutWToken } from '../../utils/w-delay';
import { wpmToWaitMs, cpmToWaitMs } from '../../utils/wpm-cmp-helpers';
import { getSpeedIncreaseByTarget, getSpeedIncrease, doSlowDown } from '../../utils/read-speed-helpers';
import { beginSession, endSession } from '../reading-session/reading-session.actions';

export function* changePart() {
  const textEnded = yield select(selectTextEnded);
  
  if (textEnded) {
    yield put(pauseReading());
    return;
  }

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
  
  console.log(usedSpeed);
  console.log(`len: ${length}`);
  var wait = useWPM ? wpmToWaitMs(usedSpeed) : cpmToWaitMs(usedSpeed, length);
  const readingTime = yield select(selectReadingTime);

  if (length === 0) {
    wait = 0;
  } 
  var cancelToken = {};

  yield call(timeoutWToken, wait, cancelToken);
  console.log(wait);
  
  const paused = yield select(selectReaderPaused);
  if (paused) {
    yield call(cancelToken.cancel);
    return;
  }
  
  yield put(setPartInfoSuccess({ word, wordsIndexes, end, lengthWithoutSpaces }));
  const newReadingTime = readingTime + wait;
  console.log(newReadingTime);
  yield put(setReadingTime(newReadingTime));

  var newSpeed = currentSpeed.speed;
  var targetSpeed = useWPM ? speedOptions.targetWPM : speedOptions.targetCPM
  if (doIniAcceleration && 
      ((newReadingTime / 1000.0 < speedOptions.initialAccelerationTimeSecs) 
       || newSpeed < targetSpeed)) {
    const x = getSpeedIncreaseByTarget({ 
      options: {
        initialSpeed: initialSpeed.speed, 
        targetSpeed: targetSpeed, 
        accTimeSecs: speedOptions.initialAccelerationTimeSecs
      }, timeMs: newReadingTime
    });
    newSpeed = initialSpeed.speed + x;
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
  
  var textEnded = yield select(selectTextEnded);
  if (textEnded) {
    yield put(setTextEnded(false));
  }

  const speed = yield select(selectInitialSpeed);
  yield put(setReadingTime(0));
  yield put(setCurrentSpeed(speed));

  const currentIndexes = yield select(selectPartIndexes);
  const readingId = yield select(selectReadingId);
  yield put(beginSession(!currentIndexes.length ? 0 : currentIndexes[0] + 1, readingId));

  yield put(resumeReadingSucees());

}

export function* setCurrentPartByIndex({ payload }) {
  const textArray = yield select(selectTextArray);
  const word = textArray[payload];
  yield put(setPartInfoSuccess({ 
    word: word, 
    wordsIndexes: [payload], 
    end: word.end, 
    lengthWithoutSpaces: word.end - word.start })
  );
}

export function* pauseReader() {

  const currentIndexes = yield select(selectPartIndexes);
  yield put(endSession(currentIndexes[0] ? currentIndexes[0] : 0));
}

export function* onChangePart() {
  yield takeLatest(ReaderActionTypes.SET_PART_INFO_START, changePart);
}

export function* onResumeReading() {
  yield takeLatest(ReaderActionTypes.RESUME_READING_START, resumeReading);
}

export function* onSetCurrentPartByIndex() {
  yield takeLatest(ReaderActionTypes.SET_CURRENT_PART_BY_INDEX, setCurrentPartByIndex);
}

export function* onPauseReader() {
  yield takeLatest(ReaderActionTypes.PAUSE_READING, pauseReader);
}

export default function* ReaderSagas() {
  yield all([
    call(onChangePart), 
    call(onResumeReading), 
    call(onSetCurrentPartByIndex), 
    call(onPauseReader)
  ])
}
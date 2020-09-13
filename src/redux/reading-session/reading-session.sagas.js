import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import ReadingSessionActionTypes from './reading-session.types';
import { selectReaderOptions } from '../reader-options/reader-options.selectors';
import { setOptionsLog, saveSessionSuccess, saveSessionFailure } from './reading-session.actions';
import { saveSessionUrl } from '../../utils/api-urls';
import { selectSessionToSave } from './reading-session.selectors';
import axios from 'axios';

export function* beginSession() {
  const optionsLog = yield select(selectReaderOptions);
  yield put(setOptionsLog(optionsLog));
}

export function* saveSession({ payload }) {
  const session = yield select(selectSessionToSave);
  try {
    yield call(axios.post, saveSessionUrl(payload), session)
    yield put(saveSessionSuccess());
  }
  catch (e) {
    yield put(saveSessionFailure(e.response.data));
  }
}

export function* onBeginSession() {
  yield takeLatest(ReadingSessionActionTypes.BEGIN_SESSION, beginSession);
}

export function* onSaveSession() {
  yield takeLatest(ReadingSessionActionTypes.SAVE_SESSION_START, saveSession);
}

export default function* ReadingSessionSagas() {
  yield all([
    call(onBeginSession), 
    call(onSaveSession), 
    
  ])
}
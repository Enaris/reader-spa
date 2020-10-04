import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import ReadingSessionActionTypes from './reading-session.types';
import { selectReaderOptions } from '../reader-options/reader-options.selectors';
import { setOptionsLog, saveSessionSuccess, saveSessionFailure, fetchDropdownSessionsSuccess, fetchDropdownSessionsFailure, fetchSessionGraphSuccess, fetchSessionGraphFailure, fetchReadingGraphSuccess, fetchReadingGraphFailure } from './reading-session.actions';
import { saveSessionUrl, getSessionsForDropdownUrl, getSessionGraphUrl, getReadingGraphUrl } from '../../utils/api-urls';
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

export function* fetchDropdownSessions({ payload }) {
  const { aspUserId, readingId } = payload;
  try {
    var result = yield call(axios.get, getSessionsForDropdownUrl(aspUserId, readingId));
    yield put(fetchDropdownSessionsSuccess(result.data));
  }
  catch (e) {
    yield put(fetchDropdownSessionsFailure(e.response.data));
  }
}

export function* fetchSessionGraph({ payload }) {
  const { aspUserId, sessionId, readingId } = payload;
  try {
    var result = yield call(axios.get, getSessionGraphUrl(aspUserId, sessionId, readingId));
    yield put(fetchSessionGraphSuccess(result.data));
  }
  catch (e) {
    yield put(fetchSessionGraphFailure(e.response.data));
  }
}

export function* fetchReadingGraph({ payload }) {
  const { aspUserId, readingId } = payload;
  try {
    var result = yield call(axios.get, getReadingGraphUrl(aspUserId, readingId));
    yield put(fetchReadingGraphSuccess(result.data));
  }
  catch (e) {
    yield put(fetchReadingGraphFailure(e.response.data));
  }
}

export function* onBeginSession() {
  yield takeLatest(ReadingSessionActionTypes.BEGIN_SESSION, beginSession);
}

export function* onSaveSession() {
  yield takeLatest(ReadingSessionActionTypes.SAVE_SESSION_START, saveSession);
}

export function* onFetchDropdownSessions() {
  yield takeLatest(ReadingSessionActionTypes.FETCH_DROPDOWN_SESSIONS_START, fetchDropdownSessions); 
}

export function* onFetchSessionGraph() {
  yield takeLatest(ReadingSessionActionTypes.FETCH_SESSION_GRAPH_START, fetchSessionGraph); 
}

export function* onFetchReadingGraph() {
  yield takeLatest(ReadingSessionActionTypes.FETCH_READING_GRAPH_START, fetchReadingGraph); 
}

export default function* ReadingSessionSagas() {
  yield all([
    call(onBeginSession), 
    call(onSaveSession), 
    call(onFetchDropdownSessions), 
    call(onFetchSessionGraph), 
    call(onFetchReadingGraph), 
  ])
}
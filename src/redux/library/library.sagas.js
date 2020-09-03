import { call, all, takeLatest, put } from 'redux-saga/effects';
import LibraryActionTypes from './library.types.js';
import { addReadingUrl, fetchTagsUrl, fetchReadingsUrl, fetchReadingUrl } from '../../utils/api-urls.js';
import { addReadingSuccess, addReadingFailure, fetchTagsSuccess, fetchTagsFailure, fetchReadingSuccess, fetchReadingFailure, fetchReadingsSuccess, fetchReadingsFailure } from './library.actions.js';
import { dataFormConfig } from '../../utils/axios-helpers.js';
import axios from 'axios';


export function* addReadingStart({ payload }) {
  var formData = new FormData();

  formData.append('title', payload.title);
  formData.append('text', payload.text);
  formData.append('description', payload.description);
  formData.append('aspUserId', payload.aspUserId);
  formData.append('coverImage', payload.coverImage);

  if (payload.tags && payload.tags.length > 0) {
    payload.tags.forEach(t => formData.append('tags', t));
  }
  if (payload.newTagsNames && payload.newTagsNames.length > 0) {
    payload.newTagsNames.forEach(t => formData.append('newTagsNames', t));
  }
  
  try {
    yield call(axios.post, addReadingUrl, formData, dataFormConfig)
    yield put(addReadingSuccess());
  }
  catch (e) {
    yield put(addReadingFailure(e.response.data));
  }
}

export function* fetchTagsStart({ payload }) {
  try {
    var result = yield call(axios.get, fetchTagsUrl(payload));
    yield put(fetchTagsSuccess(result.data));
  }
  catch (e) {
    yield put(fetchTagsFailure(e.response.data));
  }
}

export function* fetchReadingsStart({ payload }) {
  const { aspUserId, filters } = payload;
  console.log(filters);
  try {
    var result = yield call(axios.get, fetchReadingsUrl(aspUserId), {
      params: {
        ...filters
      }
    });
    yield put(fetchReadingsSuccess(result.data));
  }
  catch (e) {
    yield put(fetchReadingsFailure(e.response.data));
  }
}

export function* fetchReadingStart({ payload }) {
  const { aspUserId, readingId } = payload;
  try {
    var result = yield call(axios.get, fetchReadingUrl(aspUserId, readingId));
    yield put(fetchReadingSuccess(result.data));
  }
  catch (e) {
    yield put(fetchReadingFailure(e.response.data));
  }
}

export function* onAddReadingStart() {
  yield takeLatest(LibraryActionTypes.ADD_READING_START, addReadingStart);
}

export function* onFetchTagsStart() {
  yield takeLatest(LibraryActionTypes.FETCH_TAGS_START, fetchTagsStart); 
}

export function* onFetchReadingsStart() {
  yield takeLatest(LibraryActionTypes.FETCH_READINGS_START, fetchReadingsStart);
}

export function* onFetchReadingStart() {
  yield takeLatest(LibraryActionTypes.FETCH_READING_START, fetchReadingStart);
}

export default function* LibrarySagas() {
  yield all([
    call(onAddReadingStart), 
    call(onFetchTagsStart), 
    call(onFetchReadingsStart), 
    call(onFetchReadingStart)
    
  ])
}
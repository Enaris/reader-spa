import { call, all, takeLatest, put } from 'redux-saga/effects';
import LibraryActionTypes from './library.types.js';
import { addReadingUrl, fetchTagsUrl, fetchReadingsUrl, fetchReadingUrl, updateReadingUrl, deleteReadingUrl, fetchTableTagsUrl, fetchTagDetailsUrl, deleteTagUrl } from '../../utils/api-urls.js';
import { addReadingSuccess, addReadingFailure, fetchTagsSuccess, fetchTagsFailure, fetchReadingSuccess, fetchReadingFailure, fetchReadingsSuccess, fetchReadingsFailure, updateReadingOnlineSuccess, updateReadingOnlineFailure, deleteReadingOnlineSuccess, deleteReadingOnlineFailure, fetchTableTagsFailure, fetchTableTagsSuccess, fetchTagDetailsSuccess, fetchTagDetailsFailure, deleteTagOnlineSuccess, deleteTagOnlineFailure } from './library.actions.js';
import { dataFormConfig } from '../../utils/axios-helpers.js';
import axios from 'axios';
import { push } from 'connected-react-router';

export function* addReadingStart({ payload }) {
  var formData = new FormData();

  formData.append('title', payload.title);
  formData.append('text', payload.text);
  formData.append('description', payload.description);
  formData.append('links', payload.links);
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

export function* fetchTableTagsStart({ payload }) {
  try {
    var result = yield call(axios.get, fetchTableTagsUrl(payload));
    yield put(fetchTableTagsSuccess(result.data));
  }
  catch (e) {
    yield put(fetchTableTagsFailure(e.response.data));
  }
}

export function* fetchTagDetailsStart({ payload }) {
  const { aspUserId, tagId } = payload;
  try {
    var result = yield call(axios.get, fetchTagDetailsUrl(aspUserId, tagId));
    yield put(fetchTagDetailsSuccess(result.data));
  }
  catch (e) {
    yield put(fetchTagDetailsFailure(e.response.data));
  }
}

export function* updateReadingStart({ payload }) {
  var formData = new FormData();

  formData.append('title', payload.title);
  formData.append('text', payload.text);
  formData.append('links', payload.links);
  formData.append('description', payload.description);
  formData.append('aspUserId', payload.aspUserId);
  formData.append('readingId', payload.readingId);
  formData.append('changeText', payload.changeText);
  formData.append('removeCover', payload.removeCover)
  formData.append('newCoverImage', payload.newCoverImage);

  if (payload.tagsToAdd && payload.tagsToAdd.length > 0 ) {
    payload.tagsToAdd.forEach(t => formData.append('tagsToAdd', t));
  }

  if (payload.tagsToAssign && payload.tagsToAssign.length > 0 ) {
    payload.tagsToAssign.forEach(t => formData.append('tagsToAssign', t));
  }
  
  if (payload.tagsToRemove && payload.tagsToRemove.length > 0 ) {
    payload.tagsToRemove.forEach(t => formData.append('tagsToRemove', t));
  }
  
  try {
    yield call(axios.post, updateReadingUrl, formData, dataFormConfig)
    yield put(updateReadingOnlineSuccess());
  }
  catch (e) {
    yield put(updateReadingOnlineFailure(e.response.data));
  }
}

export function* deleteReadingStart({ payload }) {
  const { aspUserId, readingId } = payload;
  try {
    var result = yield call(axios.post, deleteReadingUrl(aspUserId, readingId));
    yield put(deleteReadingOnlineSuccess(result.data));
    yield put(push('/lib'));
  }
  catch (e) {
    yield put(deleteReadingOnlineFailure(e.response.data));
  }
}

export function* deleteTagStart({ payload }) {
  const { aspUserId, tagId } = payload;
  try {
    yield call(axios.post, deleteTagUrl(aspUserId, tagId));
    yield put(deleteTagOnlineSuccess());
    yield put(push('/lib'));
  }
  catch (e) {
    yield put(deleteTagOnlineFailure(e.response.data));
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

export function* onFetchTableTagsStart() {
  yield takeLatest(LibraryActionTypes.FETCH_TABLE_TAGS_START, fetchTableTagsStart); 
}

export function* onFetchTagDetailsStart() {
  yield takeLatest(LibraryActionTypes.FETCH_TAG_DETAILS_START, fetchTagDetailsStart); 
}

export function* onUpdateReadingStart() {
  yield takeLatest(LibraryActionTypes.UPDATE_READING_ONLINE_START, updateReadingStart);
}

export function* onDeleteReadingStart() {
  yield takeLatest(LibraryActionTypes.DELETE_READING_ONLINE_START, deleteReadingStart);
}

export function* onDeleteTagStart() {
  yield takeLatest(LibraryActionTypes.DELETE_TAG_ONLINE_START, deleteTagStart);
}

export default function* LibrarySagas() {
  yield all([
    call(onAddReadingStart), 
    call(onFetchTagsStart), 
    call(onFetchReadingsStart), 
    call(onFetchReadingStart), 
    call(onUpdateReadingStart), 
    call(onDeleteReadingStart), 
    call(onFetchTableTagsStart),
    call(onFetchTagDetailsStart), 
    call(onDeleteTagStart), 
  ])
}
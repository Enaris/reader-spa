import { call, all, takeLatest, put } from 'redux-saga/effects';
import LibraryActionTypes from './library.types.js';
import { addReadingUrl } from '../../utils/api-urls.js';
import { addReadingSuccess, addReadingFailure } from './library.actions.js';


export function* addReadingStart({ payload }) {
  var formData = new FormData();

  formData.append('title', payload.title);
  formData.append('text', payload.text);
  formData.append('description', payload.description);
  formData.append('aspUserId', payload.aspUserId);
  formData.append('cover', payload.cover);

  if (payload.tags && payload.tags.some()) {
    payload.tags.forEach(t => formData.append('tags', t));
  }
  if (payload.newTagsNames && payload.newTagsNames.some()) {
    payload.newTagsNames.forEach(t => formData.append('newTagsNames', t));
  }
  
  try {
    yield call(axios.post, addReadingUrl, payload)
    yield put(addReadingSuccess());
  }
  catch (e) {
    yield put(addReadingFailure(e.response.data));
  }
}

export function* onAddReadingStart() {
  yield takeLatest(LibraryActionTypes.ADD_READING_START, addReadingStart);
}

export default function* ReaderSagas() {
  yield all([
    call(onAddReadingStart)
  ])
}
import { call, all, takeLatest, put } from 'redux-saga/effects';
import OfflineLibActionTypes from './offline-lib.types';
import { addTags, updateReadingOfflineSuccess, setReadingPosition } from './offline-lib.actions';
import { push } from 'connected-react-router';

export function* updateReadingOffline({ payload }) {

  const { updateData: { reading, tagsUpdateData: { tagsAfterRemoval, tagsToAssign, tagsToAdd }}, changeText} = payload;
  yield put(addTags(tagsToAdd));
  reading.tags = [
    ...tagsAfterRemoval, 
    ...tagsToAssign, 
    ...tagsToAdd
  ];
  if (changeText) {
    yield put(setReadingPosition(reading.id, 0));
  }
  yield put(updateReadingOfflineSuccess(reading, changeText))
  yield put(push('/lib'));

}


export function* onUpdateReadingOffline() {
  yield takeLatest(OfflineLibActionTypes.UPDATE_READING_OFFLINE_START, updateReadingOffline);
}

export default function* OfflineLibSagas() {
  yield all([
    call(onUpdateReadingOffline)
  ])
}
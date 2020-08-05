import { call, all } from 'redux-saga/effects';

import ReaderSagas from './reader/reader.sagas';
import ReadingSagas from './reading/reading.sagas';
import AuthSagas from './auth/auth.sagas';
// import ReaderOptionsReducer from './reader-options/reader-options.reducer';

export default function* RootSagas() {
  yield all([
    call(ReadingSagas),
    call(ReaderSagas),
    call(AuthSagas)
    // call(ReaderOptionsReducer)
  ])
}
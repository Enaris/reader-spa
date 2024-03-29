import { combineReducers } from 'redux';

import ReaderReducer from './reader/reader.reducer';
import ReadingReducer from './reading/reading.reducer';
import ReaderOptionsReducer from './reader-options/reader-options.reducer';
import ReaderThemeReducer from './reader-theme/reader-theme.reducer';
import { connectRouter } from 'connected-react-router';
import AuthReducer from './auth/auth.reducer';
import OfflineLibReducer from './offline-library/offline-lib.reducer';
import LibraryReducer from './library/library.reducer';
import ReadingSessionReducer from './reading-session/reading-session.reducer';

const RootReducer = history => combineReducers({
  router: connectRouter(history),
  reading: ReadingReducer, 
  reader: ReaderReducer, 
  readerOptions: ReaderOptionsReducer,
  readerTheme: ReaderThemeReducer, 
  auth: AuthReducer, 
  offlineLib: OfflineLibReducer,
  library: LibraryReducer, 
  readingSession: ReadingSessionReducer
});

export default RootReducer;
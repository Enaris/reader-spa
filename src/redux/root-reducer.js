import { combineReducers } from 'redux';

import ReaderReducer from './reader/reader.reducer';
import ReadingReducer from './reading/reading.reducer';
import ReaderOptionsReducer from './reader-options/reader-options.reducer';
import ReaderThemeReducer from './reader-theme/reader-theme.reducer';

const RootReducer = combineReducers({
  reading: ReadingReducer, 
  reader: ReaderReducer, 
  readerOptions: ReaderOptionsReducer,
  readerTheme: ReaderThemeReducer
});

export default RootReducer;
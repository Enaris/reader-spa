import { combineReducers } from 'redux';

import ReaderReducer from './reader/reader.reducer';
import ReadingReducer from './reading/reading.reducer';
import ReaderOptionsReducer from './reader-options/reader-options.reducer';

const RootReducer = combineReducers({
  reading: ReadingReducer, 
  reader: ReaderReducer, 
  readerOptions: ReaderOptionsReducer
});

export default RootReducer;
import LibraryActionTypes from './library.types.js';

const INITIAL_STATE = {
   
  addingReading: false,
  addReadingErrors: null

}

const LibraryLibReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LibraryActionTypes.ADD_READING_START: 
      return {
        ...state,
        addingReading: true, 
        addReadingErrors: null
      }
    case LibraryActionTypes.ADD_READING_SUCCESS: 
      return {
        ...state,
        addingReading: false, 
        addReadingErrors: null
      }
    case LibraryActionTypes.ADD_READING_FAILURE: 
      return {
        ...state,
        addingReading: false, 
        addReadingErrors: action.payload
      }

    default:
      return state;
  }
}

export default LibraryLibReducer;
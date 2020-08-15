import LibraryActionTypes from './library.types.js';

export const addReadingStart = reading => ({
  type: LibraryActionTypes.ADD_READING_START, 
  payload: reading
})

export const addReadingSuccess = () => ({
  type: LibraryActionTypes.ADD_READING_SUCCESS, 
})

export const addReadingFailure = errors => ({
  type: LibraryActionTypes.ADD_READING_FAILURE,
  payload: errors
})

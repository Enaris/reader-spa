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

export const fetchTagsStart = aspUserId => ({
  type: LibraryActionTypes.FETCH_TAGS_START, 
  payload: aspUserId
})

export const fetchTagsSuccess = tags => ({
  type: LibraryActionTypes.FETCH_TAGS_SUCCESS, 
  payload: tags
})

export const fetchTagsFailure = errors => ({
  type: LibraryActionTypes.FETCH_TAGS_FAILURE, 
  payload: errors
})

export const fetchReadingsStart = aspUserId => ({
  type: LibraryActionTypes.FETCH_READINGS_START, 
  payload: aspUserId
})

export const fetchReadingsSuccess = readings => ({
  type: LibraryActionTypes.FETCH_READINGS_SUCCESS, 
  payload: readings
})

export const fetchReadingsFailure = errors => ({
  type: LibraryActionTypes.FETCH_READINGS_FAILURE, 
  payload: errors
})

export const fetchReadingStart = (aspUserId, readingId) => ({
  type: LibraryActionTypes.FETCH_READING_START, 
  payload: { aspUserId, readingId }
})

export const fetchReadingSuccess = reading => ({
  type: LibraryActionTypes.FETCH_READING_SUCCESS, 
  payload: reading
})

export const fetchReadingFailure = errors => ({
  type: LibraryActionTypes.FETCH_READING_FAILURE, 
  payload: errors
})
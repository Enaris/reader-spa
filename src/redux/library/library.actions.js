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

export const fetchTableTagsStart = aspUserId => ({
  type: LibraryActionTypes.FETCH_TABLE_TAGS_START, 
  payload: aspUserId
})

export const fetchTableTagsSuccess = tags => ({
  type: LibraryActionTypes.FETCH_TABLE_TAGS_SUCCESS, 
  payload: tags
})

export const fetchTableTagsFailure = errors => ({
  type: LibraryActionTypes.FETCH_TABLE_TAGS_FAILURE, 
  payload: errors
})

export const fetchTagDetailsStart = (aspUserId, tagId) => ({
  type: LibraryActionTypes.FETCH_TAG_DETAILS_START, 
  payload: { aspUserId, tagId }
})

export const fetchTagDetailsSuccess = tag => ({
  type: LibraryActionTypes.FETCH_TAG_DETAILS_SUCCESS, 
  payload: tag
})

export const fetchTagDetailsFailure = errors => ({
  type: LibraryActionTypes.FETCH_TAG_DETAILS_FAILURE, 
  payload: errors
})

export const fetchReadingsStart = (aspUserId, filters) => ({
  type: LibraryActionTypes.FETCH_READINGS_START, 
  payload: { aspUserId, filters }
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

export const updateReadingOnlineStart = updateData => ({
  type: LibraryActionTypes.UPDATE_READING_ONLINE_START, 
  payload: updateData
})

export const updateReadingOnlineSuccess = () => ({
  type: LibraryActionTypes.UPDATE_READING_ONLINE_SUCCESS, 
})

export const updateReadingOnlineFailure = errors => ({
  type: LibraryActionTypes.UPDATE_READING_ONLINE_FAILURE, 
  payload: errors
})


export const deleteReadingOnlineStart = deleteData => ({
  type: LibraryActionTypes.DELETE_READING_ONLINE_START, 
  payload: deleteData
})

export const deleteReadingOnlineSuccess = () => ({
  type: LibraryActionTypes.DELETE_READING_ONLINE_SUCCESS, 
})

export const deleteReadingOnlineFailure = errors => ({
  type: LibraryActionTypes.DELETE_READING_ONLINE_FAILURE, 
  payload: errors
})

export const deleteTagOnlineStart = (aspUserId, tagId) => ({
  type: LibraryActionTypes.DELETE_TAG_ONLINE_START, 
  payload: { aspUserId, tagId }
})

export const deleteTagOnlineSuccess = () => ({
  type: LibraryActionTypes.DELETE_TAG_ONLINE_SUCCESS, 
})

export const deleteTagOnlineFailure = errors => ({
  type: LibraryActionTypes.DELETE_TAG_ONLINE_FAILURE, 
  payload: errors
})

export const addReadingSetErrors = errors => ({
  type: LibraryActionTypes.ADD_READING_SET_ERRORS, 
  payload: errors
})
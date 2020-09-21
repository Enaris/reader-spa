import OfflineLibActionTypes from './offline-lib.types';

export const setReadings = readings => ({
  type: OfflineLibActionTypes.SET_READINGS, 
  payload: readings
})
export const addReading = reading => ({
  type: OfflineLibActionTypes.ADD_READING, 
  payload: reading
})
export const setFilters = filters => ({
  type: OfflineLibActionTypes.SET_FILTERS, 
  payload: filters
})
export const setReadingPosition = (readingId, position) => ({
  type: OfflineLibActionTypes.SET_READING_POSITION, 
  payload: { readingId, position }
})
export const setReadingPositions = positions => ({
  type: OfflineLibActionTypes.SET_READING_POSITIONS, 
  payload: positions
})
export const addTags = tags => ({
  type: OfflineLibActionTypes.ADD_TAGS, 
  payload: tags
})
export const updateReadingOfflineStart = ( updateData, changeText ) => ({
  type: OfflineLibActionTypes.UPDATE_READING_OFFLINE_START, 
  payload: { updateData, changeText }
})
export const updateReadingOfflineSuccess = ( updatedReading, changeText ) => ({
  type: OfflineLibActionTypes.UPDATE_READING_OFFLINE_SUCCESS, 
  payload: { updatedReading, changeText }
})
export const removeReadingOffline = readingId => ({
  type: OfflineLibActionTypes.REMOVE_READING, 
  payload: readingId
})

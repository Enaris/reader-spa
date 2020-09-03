import OfflineLibActionTypes from './offline-lib.types';

export const setReadings = readings => ({
  type: OfflineLibActionTypes.SET_READINGS, 
  payload: readings
})
export const addReading = reading => ({
  type: OfflineLibActionTypes.ADD_READING, 
  payload: reading
})
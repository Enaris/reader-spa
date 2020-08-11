import { createSelector } from 'reselect';

const selectOfflineLib = state => state.offlineLib;

export const selectReadings = createSelector(
  [selectOfflineLib], 
  reader => reader.readings
)

export const selectReading = id => createSelector(
  [selectOfflineLib], 
  reader => reader.readings.find(r => r.id === id)
)
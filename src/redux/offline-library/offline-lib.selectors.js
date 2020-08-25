import { createSelector } from 'reselect';

const selectOfflineLib = state => state.offlineLib;

export const selectReadingsOffline = createSelector(
  [selectOfflineLib], 
  reader => reader.readings
)

export const selectReadingOffline = id => createSelector(
  [selectOfflineLib], 
  reader => reader.readings.length > 0 
  ? reader.readings.find(r => +r.id === +id)
  : null
)

export const selectOfflineTags = createSelector(
  [selectOfflineLib], 
  reader => reader.tags
)

export const selectLastReadingIndex = createSelector(
  [selectOfflineLib], 
  reader => !reader.readings || reader.readings.length === 0 
    ? -1
    : Math.max( ...reader.readings.map(r => +r.id) ) 
)
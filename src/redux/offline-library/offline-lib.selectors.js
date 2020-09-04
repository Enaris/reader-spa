import { createSelector } from 'reselect';
import { filterOfflineReadings } from './offline-lib.utils';

const selectOfflineLib = state => state.offlineLib;

export const selectReadingsOffline = createSelector(
  [selectOfflineLib], 
  reader => reader.readings
)

export const selectFilters = createSelector(
  [selectOfflineLib], 
  lib => lib.filters
)

export const selectFilteredReadings = createSelector(
  [ selectReadingsOffline, 
    selectFilters
  ], 
  (readings, filters) => {
    return filterOfflineReadings(readings, filters);
  }
)

export const selectReadingOffline = id => createSelector(
  [selectOfflineLib], 
  reader => reader.readings.length > 0 
  ? reader.readings.find(r => +r.id === +id)
  : null
)

export const selectFilteredReadingsOffline = filters => createSelector(
  [selectReadingsOffline], 
  readings => {
    var result = readings;
    if (filters.title) {
      result = result.filter(r => r.title.contains(filters.title));
    }
    if (filters.tags && filters.tags.length > 0) {
      result = result.filter(r => filters.tags.every(ft => r.tags.some(t => t.name === ft.name)));
    }
    return result;
  }
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
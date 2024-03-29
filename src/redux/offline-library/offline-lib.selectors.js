import { createSelector } from 'reselect';
import { filterOfflineReadings } from './offline-lib.utils';

export const selectOfflineLib = state => state.offlineLib;

export const selectReadingsOffline = createSelector(
  [selectOfflineLib], 
  reader => reader.readings
)

export const selectReadingsOfflineAny = createSelector(
  [selectReadingsOffline], 
  readings => readings && readings.length > 0
)

export const selectFilters = createSelector(
  [selectOfflineLib], 
  lib => ({ title: lib.filtersTitle, tags: lib.filtersTags })
)

export const selectReadingsPositions = createSelector(
  [selectOfflineLib], 
  lib => lib.readingsPositions
)

export const selectReadingPosition = readingId => createSelector(
  [selectReadingsPositions], 
  pos => pos.find(p => p.readingId === readingId)
)

export const selectFilteredReadings = createSelector(
  [ selectReadingsOffline, 
    selectFilters, 
    selectReadingsPositions
  ], 
  (readings, filters, positions) => {
    var filteredReadings = filterOfflineReadings(readings, filters);
    filteredReadings.forEach(r => r.savedLocation = positions.find(p => +p.readingId === +r.id));
    return filteredReadings;
  }
)

export const selectReadingOffline = id => createSelector(
  [ selectOfflineLib ], 
  lib => {
    if (lib.readings.length === 0)
      return null;
    var reading = lib.readings.find(r => +r.id === +id);
    if (!reading || reading === null) {
      return null;
    }
    reading.savedLocation = lib.readingsPositions.find(p => +p.readingId === +reading.id).position;
    return reading;
  }
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

export const selectOfflineTagDetails = tagId => createSelector(
  [selectOfflineLib], 
  reader => {
    if (reader.tags.length === 0) {
      return null;
    }
    var tag = reader.tags.find(t => t.id === tagId)
    if (!tag || tag === null) {
      return null;
    }
    tag.readings = reader.readings
      .filter(r => r.tags.some(rt => rt.id === tagId))
      .map(r => ({ id: r.id, title: r.title }))
    return tag;
  }
)

export const selectLastReadingIndex = createSelector(
  [selectOfflineLib], 
  reader => !reader.readings || reader.readings.length === 0 
    ? -1
    : Math.max( ...reader.readings.map(r => +r.id) ) 
)

export const selectOfflineTagsForTable = createSelector(
  [selectOfflineLib], 
  reader => reader.tags.map(t => { 
    const count = reader.readings.filter(r => r.tags.some(rt => rt.id === t.id)).length;
    return {
    id: t.id, 
    name: t.name, 
    tagedCount: count
  }})
)
export const filterOfflineReadings = ( readings, filters ) => {
  var result = readings;
  if (filters.title) {
    result = result.filter(r => r.title.includes(filters.title));
  }
  if (filters.tags && filters.tags.length > 0) {
    result = result.filter(r => filters.tags.every(ft => r.tags.some(t => t.id === ft)));
  }
  return result;
}
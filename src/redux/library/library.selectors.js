import { createSelector } from 'reselect';

const selectLibrary = state => state.library;

export const selectAddingReading = createSelector(
  [selectLibrary], 
  library => library.addingReading
)

export const selectOnlineTags = createSelector(
  [selectLibrary], 
  library => library.tags
)

export const selectFetchingTags = createSelector(
  [selectLibrary], 
  library => library.fetchingTags
)

export const selectFetchingTagsErros = createSelector(
  [selectLibrary], 
  library => library.fetchingTagsErrors
)

export const selectOnlineTagDetails = createSelector(
  [selectLibrary], 
  library => library.tagDetails
)

export const selectFetchingTagDetails = createSelector(
  [selectLibrary], 
  library => library.fetchingTagDetails
)

export const selectFetchingTagDetailsErros = createSelector(
  [selectLibrary], 
  library => library.fetchingTagDetailsErrors
)

export const selectOnlineTableTags = createSelector(
  [selectLibrary], 
  library => library.tableTags
)

export const selectFetchingOnlineTableTags = createSelector(
  [selectLibrary], 
  library => library.fetchingTableTags
)

export const selectFetchingOnlineTableErros = createSelector(
  [selectLibrary], 
  library => library.fetchingTableTagsErrors
)

export const selectReadingsOnline = createSelector(
  [selectLibrary], 
  library => library.readings
)

export const selectReadingsFetching = createSelector(
  [selectLibrary], 
  library => library.fetchingReadings
)

export const selectReadingsFetchingErrors = createSelector(
  [selectLibrary], 
  library => library.fetchingReadingsErrors
)

export const selectSeletedReading = createSelector(
  [selectLibrary], 
  library => library.selectedReading
)

export const selectSeletedReadingFetching = createSelector(
  [selectLibrary], 
  library => library.fetchingSelectedReading
)

export const selectSeletedReadingFetchingErrors = createSelector(
  [selectLibrary], 
  library => library.fetchingSelectedReadingErrors
)

export const selectDeletingReadingOnline = createSelector(
  [selectLibrary], 
  library => library.deletingReading
)

export const selectAddReadingErrors = createSelector(
  [selectLibrary], 
  library => library.addReadingErrors
)
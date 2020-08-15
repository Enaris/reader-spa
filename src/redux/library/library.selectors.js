import { createSelector } from 'reselect';

const selectLibrary = state => state.library;

export const selectAddingReading = createSelector(
  [selectLibrary], 
  library => library.addingReading
)

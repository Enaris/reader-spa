import { createSelector } from 'reselect';

const selectReaderTheme = state => state.readerTheme;

export const selectTheme = createSelector(
  [selectReaderTheme],
  t => t.theme
);
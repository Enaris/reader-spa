import { createSelector } from 'reselect';

const selectReading = state => state.reading;

export const selectText = createSelector(
  [selectReading],
  reading => reading.text
);

export const selectTextEnded = createSelector(
  [selectReading], 
  reading => reading.textEnded
);

export const selectTextLoading = createSelector(
  [selectReading], 
  reading => reading.textLoading
);

export const selectTextArray = createSelector(
  [selectReading], 
  reading => reading.textArray
)
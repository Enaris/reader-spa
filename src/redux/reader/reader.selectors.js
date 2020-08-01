import { createSelector } from 'reselect';

const selectReader = state => state.reader;

export const selectPartLength = createSelector(
  [selectReader], 
  reader => reader.partLength
)

export const selectReaderPaused = createSelector(
  [selectReader], 
  reader => reader.readerPaused
)

export const selectPartEnd = createSelector(
  [selectReader], 
  reader => reader.partEnd
)

export const selectPartStr = createSelector(
  [selectReader], 
  reader => reader.currentPart
)

export const selectPartIndexes = createSelector(
  [selectReader], 
  reader => reader.partIndexes
)
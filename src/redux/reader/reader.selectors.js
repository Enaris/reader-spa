import { createSelector } from 'reselect';
import { selectTextArrayRowIndexes } from '../reading/reading.selectors';

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

export const selectCurrentSpeed = createSelector(
  [selectReader], 
  reader => reader.currentSpeed
)

export const selectReadingTime = createSelector(
  [selectReader], 
  reader => reader.readingTime
)

export const selectSlow = createSelector(
  [selectReader], 
  reader => reader.slow
)

export const selectNewText = createSelector(
  [selectReader], 
  reader => reader.newText
)

export const selectCurrentRow = createSelector(
  [ selectTextArrayRowIndexes,
    selectPartIndexes
  ],
  (rows, wordIndexes) => {
    if (rows.length === 0 || wordIndexes.length === 0) {
      return 0;
    }
    const stWordIndex = wordIndexes[0];
    const currentRowIndex = rows.findIndex(row => row.some(index => index === stWordIndex));
    return currentRowIndex === -1 ? 0 : currentRowIndex;
  } 
)
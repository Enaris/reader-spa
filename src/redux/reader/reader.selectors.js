import { createSelector } from 'reselect';
import { selectText } from '../reading/reading.selectors';

const selectReader = state => state.reader;

export const selectPartPosition = createSelector(
  [selectReader], 
  reader => reader.currentPartPosition
)

export const selectPartLength = createSelector(
  [selectReader], 
  reader => reader.currentPartLength
)

export const selectPartBroken = createSelector(
  [selectReader], 
  reader => reader.currentBroken
)

export const selectWordEnd = createSelector(
  [selectReader], 
  reader => reader.currentPartLength + reader.currentPartPosition
)

export const selectReaderPaused = createSelector(
  [selectReader], 
  reader => reader.readerPaused
)

export const selectCurrentWord = createSelector(
  [selectText, selectPartPosition, selectWordEnd, selectPartBroken], 
  (text, start, end, broken) => {
    var word = text.slice(start, end);
    return broken ? "-" + word : word;
  }
)

export const selectCurrentReadTimeMs = createSelector(
  [selectReader], 
  reader => reader.currentReadTimeMs
)

export const selectTimeout = createSelector(
  [selectReader], 
  reader => reader.currentTimeout
)

// -------------------
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
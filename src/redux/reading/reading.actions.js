import ReadingActionTypes from './reading.types';

export const setText = text => ({
  type: ReadingActionTypes.SET_TEXT,
  payload: text
})

export const nullText = () => ({
  type: ReadingActionTypes.NULL_TEXT
})

export const setTextEnded = () => ({
  type: ReadingActionTypes.SET_TEXT_ENDED
})

export const setTextArray = array => ({
  type: ReadingActionTypes.SET_TEXT_ARRAY, 
  payload: array
})

export const setTextArrayRowIndexes = rowIndexes => ({
  type: ReadingActionTypes.SET_TEXT_ARRAY_ROW_INDEXES, 
  payload: rowIndexes
})

export const processTextStart = text => ({
  type: ReadingActionTypes.PROCESS_TEXT_START,
  payload: text
})

export const processTextSuccess = () => ({
  type: ReadingActionTypes.PROCESS_TEXT_SUCCESS
})
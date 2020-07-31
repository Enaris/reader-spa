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

export const setLoadTextStart = () => ({
  type: ReadingActionTypes.LOAD_TEXT_START
})

export const setLoadTextSuccess = () => ({
  type: ReadingActionTypes.LOAD_TEXT_SUCCESS
})
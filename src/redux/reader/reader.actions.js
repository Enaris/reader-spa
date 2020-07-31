import ReaderActionTypes from './reader.types';

export const changeWordStart = () => ({
  type: ReaderActionTypes.CHANGE_WORD_START
})

export const changeWordSuccess = () => ({
  type: ReaderActionTypes.CHANGE_WORD_SUCCESS,
})

export const changeWordFailure = () => ({
  type: ReaderActionTypes.CHANGE_WORD_FAILURE
})

export const pauseReading = () => ({
  type: ReaderActionTypes.PAUSE_READING
})

export const resumeReading = () => ({
  type: ReaderActionTypes.RESUME_READING
})

export const setWord = wordInfo => ({
  type: ReaderActionTypes.SET_WORD, 
  payload: wordInfo
})

export const setCurrentReadTimeMs = ms => ({
  type: ReaderActionTypes.SET_CURRENT_READ_TIME, 
  payload: ms
})

export const setCurrentTimeout = timeoutId => ({
  type: ReaderActionTypes.SET_CURRENT_TIMEOUT, 
  payload: timeoutId
})

export const setPartInfoStart = () => ({
  type: ReaderActionTypes.SET_PART_INFO_START 
})

export const setPartInfoSuccess = info => ({
  type: ReaderActionTypes.SET_PART_INFO_SUCCESS, 
  payload: info
})

export const setWordLength = length => ({
  type: ReaderActionTypes.SET_WORD_LENGTH,
  payload: length
})
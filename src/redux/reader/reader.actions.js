import ReaderActionTypes from './reader.types';

export const pauseReading = () => ({
  type: ReaderActionTypes.PAUSE_READING
})

export const resumeReadingStart = (resumeAtIndex, wordStart) => ({
  type: ReaderActionTypes.RESUME_READING_START, 
  payload: { resumeAtIndex, wordStart }
})

export const resumeReadingSucees = () => ({
  type: ReaderActionTypes.RESUME_READING_SUCCESS
})

export const setPartInfoStart = () => ({
  type: ReaderActionTypes.SET_PART_INFO_START 
})

export const setPartInfoSuccess = info => ({
  type: ReaderActionTypes.SET_PART_INFO_SUCCESS, 
  payload: info
})

export const setCurrentSpeed = speed => ({
  type: ReaderActionTypes.SET_CURRENT_SPEED, 
  payload: speed
})

export const setReadingTime = ms => ({
  type: ReaderActionTypes.SET_READING_TIME, 
  payload: ms
})

export const setSlow = slow => ({
  type: ReaderActionTypes.SET_SLOW, 
  payload: slow
})

export const setNewText = newText => ({
  type: ReaderActionTypes.SET_NEW_TEXT, 
  payload: newText
})

export const resetReader = () => ({
  type: ReaderActionTypes.RESET_READER 
})

export const setCurrentPartByIndex = wIndex => ({
  type: ReaderActionTypes.SET_CURRENT_PART_BY_INDEX, 
  payload: wIndex
})
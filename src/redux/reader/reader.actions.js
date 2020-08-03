import ReaderActionTypes from './reader.types';

export const pauseReading = () => ({
  type: ReaderActionTypes.PAUSE_READING
})

export const resumeReadingStart = () => ({
  type: ReaderActionTypes.RESUME_READING_START
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
import ReaderActionTypes from './reader.types';

export const pauseReading = () => ({
  type: ReaderActionTypes.PAUSE_READING
})

export const resumeReading = () => ({
  type: ReaderActionTypes.RESUME_READING
})

export const setPartInfoStart = () => ({
  type: ReaderActionTypes.SET_PART_INFO_START 
})

export const setPartInfoSuccess = info => ({
  type: ReaderActionTypes.SET_PART_INFO_SUCCESS, 
  payload: info
})

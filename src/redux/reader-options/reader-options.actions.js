import ReaderOptionsActionTypes from './reader-options.types';

export const setInitialWPM = wpm => ({
  type: ReaderOptionsActionTypes.SET_INITIAL_WPM, 
  payload: wpm
})

export const setInitialCPM = cpm => ({
  type: ReaderOptionsActionTypes.SET_INITIAL_CPM, 
  payload: cpm
})

export const setAppendMin = appendMin => ({
  type: ReaderOptionsActionTypes.SET_APPEND_MIN, 
  payload: appendMin
})

export const setBreakFrom = breakFrom => ({
  type: ReaderOptionsActionTypes.SET_BREAK_FROM, 
  payload: breakFrom
})

export const setSpeedOptions = options => ({
  type: ReaderOptionsActionTypes.SET_SPEED_OPTIONS, 
  payload: options
})
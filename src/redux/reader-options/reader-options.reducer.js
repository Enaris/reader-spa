import ReaderOptionsActionTypes from './reader-options.types';

const INITIAL_STATE = {

  initialCPM: 3000, 
  initialWPM: -1, 

  targetWPM: -1, 
  targetCPM: -1,

  breakIfLonger: -1,
  appendIfShorter: -1, 
  maxAppend: -1,

  initialAccelerationTimeSecs: -1,

  addPerMin: -1,
}

const ReaderOptionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReaderOptionsActionTypes.SET_INITIAL_WPM: 
      return {
        ...state, 
        initialWPM: action.payload
      }
    case ReaderOptionsActionTypes.SET_INITIAL_CPM: 
      return {
        ...state, 
        initialCPM: action.payload
      }
    case ReaderOptionsActionTypes.SET_APPEND_IF_SHORTER: 
      return {
        ...state, 
        appendIfShorter: action.payload
      }
    case ReaderOptionsActionTypes.SET_BREAK_IF_LONGER: 
      return {
        ...state, 
        breakIfLonger: action.payload
      } 
    case ReaderOptionsActionTypes.SET_INITIAL_ACCELERATION_TIME_SECS:
      return {
        ...state, 
        initialAccelerationTimeSecs: action.payload
      }
    case ReaderOptionsActionTypes.SET_MAX_APPEND: 
      return {
        ...state, 
        maxAppend: action.payload
      }
    default:
      return state;
  }
}

export default ReaderOptionsReducer;
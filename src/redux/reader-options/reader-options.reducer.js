import ReaderOptionsActionTypes from './reader-options.types';

const INITIAL_STATE = {

  initialCPM: 1000, 
  initialWPM: -1, 

  targetWPM: -1, 
  targetCPM: -1,

  breakIfLonger: 5,
  slowIfLonger: -1, 
  appendIfShorter: 3, 
  maxAppend: 3,

  initialAccelerationTimeSecs: -1,

  addPerMin: 11,

  slowTo: 200,
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
    case ReaderOptionsActionTypes.SET_SPEED_OPTIONS:
      const { 
        initialCPM, 
        initialWPM, 
        targetWPM, 
        targetCPM, 
        breakIfLonger, 
        slowIfLonger, 
        appendIfShorter, 
        maxAppend, 
        initialAccelerationTimeSecs, 
        addPerMin, 
        slowTo 
      } = action.payload;
      return {
        ...state,
        initialCPM: initialCPM,
        initialWPM: initialWPM, 
        targetWPM: targetWPM, 
        targetCPM: targetCPM, 
        breakIfLonger: breakIfLonger, 
        slowIfLonger: slowIfLonger,
        appendIfShorter: appendIfShorter, 
        maxAppend: maxAppend, 
        initialAccelerationTimeSecs: initialAccelerationTimeSecs, 
        addPerMin: addPerMin, 
        slowTo: slowTo 
      } 

    default:
      return state;
  }
}

export default ReaderOptionsReducer;
import ReaderOptionsActionTypes from './reader-options.types';

const INITIAL_STATE = {

  initialCPM: 3000, 
  initialWPM: -1, 

  targetWPM: -1, 
  targetCPM: -1,

  breakIfLonger: -1,
  appendIfShorter: -1, 
  maxAppend: -1,

  initialAccelaretionTimeSecs: -1,

  addPerMin: -1,

  appendMin: 1, 
  breakFrom: -1

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
    case ReaderOptionsActionTypes.SET_APPEND_MIN: 
      return {
        ...state, 
        appendMin: action.payload
      }
    case ReaderOptionsActionTypes.SET_BREAK_FROM: 
      return {
        ...state, 
        breakFrom: action.payload
      } 
    default:
      return state;
  }
}

export default ReaderOptionsReducer;
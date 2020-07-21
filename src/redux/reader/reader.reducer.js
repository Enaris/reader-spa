import ReaderActionTypes from './reader.types';

const INITIAL_STATE = {
  readerPaused: false,

  currentPartPosition: -1,
  currentPartLength: 0, 
  currentBroken: false,
  changingWord: false, 

  currentReadTimeMs: 333,

  currentTimeout: null
}

const ReaderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReaderActionTypes.PAUSE_READING: 
      return {
        ...state, 
        readerPaused: true
      }
    case ReaderActionTypes.RESUME_READING: 
      return {
        ...state, 
        readerPaused: false
      }
    case ReaderActionTypes.SET_WORD: 
      const { start, length, broken } = action.payload;
      return {
        ...state, 
        currentPartPosition: start, 
        currentPartLength: length, 
        currentBroken: broken
      }
    case ReaderActionTypes.SET_WORD_LENGTH:
      return {
        ...state, 
        currentPartLength: action.payload
      }
    
    case ReaderActionTypes.SET_WORD_POSITION:
      return {
        ...state, 
        currentPartPosition: action.payload
      }
    case ReaderActionTypes.CHANGE_WORD_START: 
      return {
        ...state, 
        changingWord: true,
      }
    case ReaderActionTypes.CHANGE_WORD_SUCCESS: 
      return {
        ...state, 
        changingWord: false
      }
    case ReaderActionTypes.SET_CURRENT_READ_TIME: 
      return {
        ...state, 
        currentReadTimeMs: action.payload
      }
    case ReaderActionTypes.SET_CURRENT_TIMEOUT: 
      return {
        ...state, 
        currentTimeout: action.payload
      }
    default:
        return state;
  }
}

export default ReaderReducer;
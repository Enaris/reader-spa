import ReaderActionTypes from './reader.types';

const INITIAL_STATE = {
  readerPaused: true,

  currentPart: '',
  partIndexes: [],
  partEnd: 0,  
  partLength: 0, 

  // ----------
  currentSpeed: null, 
  readingTime: 0, 
  slow: false, 

  // -----------
  newText: '', 

  // -----------
  testMode: false
}

const ReaderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReaderActionTypes.PAUSE_READING: 
      return {
        ...state, 
        readerPaused: true
      }
    
    case ReaderActionTypes.RESUME_READING_START: 
      const { resumeAtIndex, wordStart } = action.payload;
      return {
        ...state, 
        readerPaused: true, 
        currentPart: '', 
        partIndexes: resumeAtIndex ? [ resumeAtIndex - 1 ] : [], 
        partEnd: wordStart ? wordStart - 1 : 0, 
        partLength: 0
      }
    case ReaderActionTypes.RESUME_READING_SUCCESS: 
      return {
        ...state, 
        readerPaused: false
      }
    
    case ReaderActionTypes.SET_CURRENT_SPEED:
      return {
        ...state, 
        currentSpeed: action.payload
      }
    case ReaderActionTypes.SET_READING_TIME: 
      return {
        ...state, 
        readingTime: action.payload
      }
    case ReaderActionTypes.SET_SLOW: 
      return {
        ...state, 
        slow: action.payload
      }
    case ReaderActionTypes.SET_PART_INFO_SUCCESS: 
      const { word, wordsIndexes, end, lengthWithoutSpaces } = action.payload;
      return {
        ...state,
        currentPart: word, 
        partIndexes: wordsIndexes, 
        partEnd: end, 
        partLength: lengthWithoutSpaces
      }
    
    case ReaderActionTypes.RESET_READER: 
      return {
        ...INITIAL_STATE, 
        testMode: state.testMode
      }
    
    case ReaderActionTypes.SET_NEW_TEXT: 
      return { 
        ...state, 
        newText: action.payload
      }

    case ReaderActionTypes.SET_TEST_MODE:
      return {
        ...state, 
        testMode: action.payload
      }
    default:
        return state;
  }
}

export default ReaderReducer;
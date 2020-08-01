import ReaderActionTypes from './reader.types';

const INITIAL_STATE = {
  readerPaused: false,

  currentPart: '',
  partIndexes: [],
  partEnd: 0,  
  partLength: 0, 
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
    
    case ReaderActionTypes.SET_PART_INFO_SUCCESS: 
      const { word, wordsIndexes, end, lengthWithoutSpaces } = action.payload;
      return {
        ...state,
        currentPart: word, 
        partIndexes: wordsIndexes, 
        partEnd: end, 
        partLength: lengthWithoutSpaces
      }
    default:
        return state;
  }
}

export default ReaderReducer;
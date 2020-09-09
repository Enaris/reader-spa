import ReadingActionTypes from './reading.types';

const INITIAL_STATE = {
  text: "Alicja ma kota, kot ma Alę, Alicja w Krainie czarów i tak dalej o w małymm znaczeniu. Alicja ma kota, kot ma Alę, Alicja w Krainie czarów i tak dalej o w małymm znaczeniu. Alicja ma kota, kot ma Alę, Alicja w Krainie czarów i tak dalej o w małymm znaczeniu. Alicja ma kota, kot ma Alę, Alicja w Krainie czarów i tak dalej o w małymm znaczeniu. Alicja ma kota, kot ma Alę, Alicja w Krainie czarów i tak dalej o w małymm znaczeniu. Alicja ma kota, kot ma Alę, Alicja w Krainie czarów i tak dalej o w małymm znaczeniu.",
  textArray: [],
  textArrayRowIndexes: [],
  textProcessing: false,
  textEnded: false,  
}

const ReadingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReadingActionTypes.NULL_TEXT: 
      return {
        ...state, 
        text: '',
        textEnded: false
      }
    case ReadingActionTypes.SET_TEXT: 
      return {
        ...state, 
        text: action.payload, 
        textEnded: false
      }
    case ReadingActionTypes.SET_TEXT_ARRAY: 
      return {
        ...state, 
        textArray: action.payload
      }
    case ReadingActionTypes.SET_TEXT_ENDED: 
      return {
        ...state, 
        textEnded: true
      }
    case ReadingActionTypes.SET_TEXT_ARRAY_ROW_INDEXES: 
      return {
        ...state, 
        textArrayRowIndexes: action.payload
      }
    case ReadingActionTypes.PROCESS_TEXT_START: 
      return {
        ...state, 
        textProcessing: true
      }
    case ReadingActionTypes.PROCESS_TEXT_SUCCESS:
      return {
        ...state, 
        textProcessing: false
      }
    case ReadingActionTypes.PROCESS_TEXT_FAILURE:
      return {
        ...state,
        textProcessing: false
      }
    default:
      return state;
  }
}

export default ReadingReducer;
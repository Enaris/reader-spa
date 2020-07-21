import ReadingActionTypes from './reading.types';

const INITIAL_STATE = {
  text: "Here im am a asjkdfhkjdsh an ajksdfh v sjkdfhhhk c sdfjhj sdfhj fsdjhsfsd.",
  textArray: [],
  textLoading: false,
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
    case ReadingActionTypes.LOAD_TEXT_START: 
      return {
        ...state, 
        textLoading: true
      }
    case ReadingActionTypes.LOAD_TEXT_SUCCESS:
      return {
        ...state, 
        textLoading: false
      }
    case ReadingActionTypes.LOAD_TEXT_FAILURE:
      return {
        ...state,
        textLoading: false
      }
    default:
      return state;
  }
}

export default ReadingReducer;
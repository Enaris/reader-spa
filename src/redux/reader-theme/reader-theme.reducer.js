import ReaderThemeActionTypes from './reader-theme.types';

const INITIAL_STATE = {

  theme: {
    bgColor: '#2C2C2C',
    wordColor: '#C8C8C8',
    wordSize: 45
  }

}


const ReaderThemeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReaderThemeActionTypes.SET_THEME: 
      return {
        ...state, 
        theme: action.payload
      }
    case ReaderThemeActionTypes.SET_BACKGROUND_COLOR: 
      return {
        ...state, 
        theme: { 
          bgColor: action.payload,
          wordColor: state.theme.wordColor,
          wordSize: state.theme.wordSize
        }
      }
    case ReaderThemeActionTypes.SET_WORD_COLOR: 
      return {
        ...state, 
        theme: { 
          bgColor: state.theme.bgColor,
          wordColor: action.payload,
          wordSize: state.theme.wordSize
        }
      }
    case ReaderThemeActionTypes.SET_WORD_FONT_SIZE: 
      return {
        ...state, 
        theme: { 
          bgColor: state.theme.bgColor,
          wordColor: state.theme.wordColor,
          wordSize: action.payload
        }
      }
    default:
      return state;
  }
}

export default ReaderThemeReducer;
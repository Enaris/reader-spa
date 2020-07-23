import ReaderThemeActionTypes from './reader-theme.types';

export const setTheme = theme => ({
  type: ReaderThemeActionTypes.SET_THEME, 
  payload: theme
});

export const setBackgroundColor = bgColor => ({
  type: ReaderThemeActionTypes.SET_BACKGROUND_COLOR, 
  payload: bgColor
});

export const setTextColor = txtColor => ({
  type: ReaderThemeActionTypes.SET_TEXT_COLOR, 
  payload: txtColor
});

export const setWordFontSize = size => ({
  type: ReaderThemeActionTypes.SET_WORD_FONT_SIZE, 
  payload: size
});
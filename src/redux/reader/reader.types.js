const ReaderActionTypes = {

  PAUSE_READING: 'PAUSE_READING',
  RESUME_READING_START: 'RESUME_READING_START',
  RESUME_READING_SUCCESS: 'RESUME_READING_SUCCESS',
  RESUME_READING_FAILURE: 'RESUME_READING_FAILURE',

  SET_PART_INFO_START: 'SET_PART_INFO_START',
  SET_PART_INFO_SUCCESS: 'SET_PART_INFO_SUCCESS',  
  SET_CURRENT_SPEED: 'SET_CURRENT_SPEED', 
  SET_READING_TIME: 'SET_READING_TIME', 
  SET_SLOW: 'SET_SLOW', 
  SET_NEW_TEXT: 'SET_NEW_TEXT', 
  SET_CURRENT_PART_BY_INDEX: 'SET_CURRENT_PART_BY_INDEX', 

  RESET_READER: 'RESET_READER', 
  SET_TEST_MODE: 'SET_TEST_MODE'
}

export default ReaderActionTypes;
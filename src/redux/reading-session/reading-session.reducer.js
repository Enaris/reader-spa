import ReadingSessionActionTypes from "./reading-session.types";

const INITIAL_STATE = {
  optionsLog: null, 
  startLocation: -1, 
  endLocation: -1, 
  startTime: null, 
  endTime: null, 
  readingId: null, 

  savingSession: false, 
  sessionSaved: true
  
}


const ReadingSessionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReadingSessionActionTypes.BEGIN_SESSION:
      const { beginLocation, readingId } = action.payload; 
      return {
        ...state, 
        startLocation: beginLocation,
        endLocation: -1,
        startTime: new Date(),
        endTime: null, 
        readingId: readingId, 
        sessionSaved: false
      }
    case ReadingSessionActionTypes.END_SESSION:
      return {
        ...state, 
        endLocation: action.payload,
        endTime: new Date(), 
        sessionSaved: false
      }
    case ReadingSessionActionTypes.SAVE_SESSION_START: 
      return {
        ...state, 
        savingSession: true
      }
    case ReadingSessionActionTypes.SAVE_SESSION_SUCCESS: 
      return {
        ...state, 
        savingSession: false, 
        sessionSaved: true
      }
    case ReadingSessionActionTypes.SET_OPTIONS_LOG: 
      return {
        ...state, 
        optionsLog: action.payload
      }
    default:
      return state;
  }
}

export default ReadingSessionReducer;
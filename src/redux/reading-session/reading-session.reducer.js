import ReadingSessionActionTypes from "./reading-session.types";

const INITIAL_STATE = {
  optionsLog: null, 
  startLocation: -1, 
  endLocation: -1, 
  startTime: null, 
  endTime: null, 
  readingId: null, 

  savingSession: false, 
  sessionSaved: true, 

  dropdownSessions: [],
  fetchingDropdownSessions: false,
  fetchingDropdownSessionsErrors: null,

  sessionGraphData: null, 
  fetchingSessionGraphData: true,
  fetchingSessionGraphDataErrors: null, 

  readingGraphData: null, 
  fetchingReadingGraphData: true, 
  fetchingReadingGraphDataErrors: null
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

    case ReadingSessionActionTypes.FETCH_DROPDOWN_SESSIONS_START: 
      return {
        ...state,
        fetchingDropdownSessions: true,
        fetchingDropdownSessionsErrors: null,
        dropdownSessions: []
      }
    case ReadingSessionActionTypes.FETCH_DROPDOWN_SESSIONS_SUCCESS: 
      return {
        ...state,
        fetchingDropdownSessions: false,
        fetchingDropdownSessionsErrors: null,
        dropdownSessions: action.payload
      }
    case ReadingSessionActionTypes.FETCH_DROPDOWN_SESSIONS_FAILURE: 
      return {
        ...state,
        fetchingDropdownSessions: false,
        fetchingDropdownSessionsErrors: action.payload,
        dropdownSessions: []
      }
    
    case ReadingSessionActionTypes.FETCH_SESSION_GRAPH_START: 
      return {
        ...state,
        sessionGraphData: null,
        fetchingSessionGraphDataErrors: null,
        fetchingSessionGraphData: true
      }
    case ReadingSessionActionTypes.FETCH_SESSION_GRAPH_SUCCESS: 
      return {
        ...state,
        sessionGraphData: action.payload,
        fetchingSessionGraphDataErrors: null,
        fetchingSessionGraphData: false
      }
    case ReadingSessionActionTypes.FETCH_SESSION_GRAPH_FAILURE: 
      return {
        ...state,
        sessionGraphData: null,
        fetchingSessionGraphDataErrors: action.payload,
        fetchingSessionGraphData: false
      }
    
    case ReadingSessionActionTypes.FETCH_READING_GRAPH_START: 
      return {
        ...state,
        readingGraphData: null,
        fetchingReadingGraphDataErrors: null,
        fetchingReadingGraphData: true
      }
    case ReadingSessionActionTypes.FETCH_READING_GRAPH_SUCCESS: 
      return {
        ...state,
        readingGraphData: action.payload,
        fetchingReadingGraphDataErrors: null,
        fetchingReadingGraphData: false
      }
    case ReadingSessionActionTypes.FETCH_READING_GRAPH_FAILURE: 
      return {
        ...state,
        readingGraphData: null,
        fetchingReadingGraphDataErrors: action.payload,
        fetchingReadingGraphData: false
      }

    default:
      return state;
  }
}

export default ReadingSessionReducer;
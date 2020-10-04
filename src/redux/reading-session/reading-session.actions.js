import ReadingSessionActionTypes from "./reading-session.types";

export const beginSession = (beginLocation, readingId) => ({
  type: ReadingSessionActionTypes.BEGIN_SESSION, 
  payload: { beginLocation, readingId }
});

export const endSession = endLocation => ({
  type: ReadingSessionActionTypes.END_SESSION, 
  payload: endLocation
}); 

export const setOptionsLog = optionsLog => ({
  type: ReadingSessionActionTypes.SET_OPTIONS_LOG, 
  payload: optionsLog
})

export const saveSessionStart = aspUserId => ({
  type: ReadingSessionActionTypes.SAVE_SESSION_START,
  payload: aspUserId 
})

export const saveSessionSuccess = () => ({
  type: ReadingSessionActionTypes.SAVE_SESSION_SUCCESS, 
})

export const saveSessionFailure = errors => ({
  type: ReadingSessionActionTypes.SAVE_SESSION_FAILURE,
  payload: errors 
})

export const fetchDropdownSessionsStart = (aspUserId, readingId) => ({
  type: ReadingSessionActionTypes.FETCH_DROPDOWN_SESSIONS_START,
  payload: { aspUserId, readingId }
})

export const fetchDropdownSessionsSuccess = sessions => ({
  type: ReadingSessionActionTypes.FETCH_DROPDOWN_SESSIONS_SUCCESS,
  payload: sessions
})

export const fetchDropdownSessionsFailure = errors => ({
  type: ReadingSessionActionTypes.FETCH_DROPDOWN_SESSIONS_FAILURE, 
  payload: errors
})

export const fetchSessionGraphStart = (aspUserId, sessionId, readingId) => ({
  type: ReadingSessionActionTypes.FETCH_SESSION_GRAPH_START,
  payload: { aspUserId, sessionId, readingId }
})

export const fetchSessionGraphSuccess = graphData => ({
  type: ReadingSessionActionTypes.FETCH_SESSION_GRAPH_SUCCESS,
  payload: graphData
})

export const fetchSessionGraphFailure = errors => ({
  type: ReadingSessionActionTypes.FETCH_SESSION_GRAPH_FAILURE, 
  payload: errors
})

export const fetchReadingGraphStart = (aspUserId, readingId) => ({
  type: ReadingSessionActionTypes.FETCH_READING_GRAPH_START,
  payload: { aspUserId, readingId }
})

export const fetchReadingGraphSuccess = graphData => ({
  type: ReadingSessionActionTypes.FETCH_READING_GRAPH_SUCCESS,
  payload: graphData
})

export const fetchReadingGraphFailure = errors => ({
  type: ReadingSessionActionTypes.FETCH_READING_GRAPH_FAILURE, 
  payload: errors
})


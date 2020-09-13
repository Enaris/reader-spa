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

import { createSelector } from 'reselect';

const selectReadingSession = state => state.readingSession;

export const selectSessionToSave = createSelector(
  [selectReadingSession], 
  session => session.endLocation === -1 ? null : ({
    optionsLog: session.optionsLog, 
    startLocation: session.startLocation, 
    endLocation: session.endLocation, 
    startTime: session.startTime, 
    endTime: session.endTime, 
    readingId: session.readingId
  })
)

export const selectSessionSaved = createSelector(
  [selectReadingSession], 
  session => session.sessionSaved
)

export const selectSavingSession = createSelector(
  [selectReadingSession], 
  session => session.savingSession
)

export const selectFetchingDropdownSessions = createSelector(
  [selectReadingSession], 
  session => session.fetchingDropdownSessions
)

export const selectDropdownSessions = createSelector(
  [selectReadingSession], 
  session => session.dropdownSessions
)

export const selectFetchingSessionGraph = createSelector(
  [selectReadingSession], 
  session => session.fetchingSessionGraphData
)

export const selectSessionGraph = createSelector(
  [selectReadingSession], 
  session => session.sessionGraphData
)

export const selectFetchingReadingGraph = createSelector(
  [selectReadingSession], 
  session => session.fetchingReadingGraphData
)

export const selectReadingGraph = createSelector(
  [selectReadingSession], 
  session => session.readingGraphData
)
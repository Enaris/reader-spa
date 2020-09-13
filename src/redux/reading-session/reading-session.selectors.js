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
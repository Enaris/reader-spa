import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './reading-session-tab.styles.scss';
import LoadingAutocomplete from '../../../../general/loading-autocomplete/loading-autocomplete.component';
import { selectFetchingDropdownSessions, selectDropdownSessions, selectFetchingSessionGraph } from '../../../../../redux/reading-session/reading-session.selectors';
import { selectCurrentUser } from '../../../../../redux/auth/auth.selectors';
import { createStructuredSelector } from 'reselect';
import { fetchDropdownSessionsStart, fetchSessionGraphStart } from '../../../../../redux/reading-session/reading-session.actions';
import { TextField } from '@material-ui/core';
import { toDDMMYYYY, toHHMM } from '../../../../../utils/date-helpers';
import ReadingSessionChart from '../chart/reading-session-chart.component';

const ReadingSessionTab = ({ user, 
  sessionsLoading, 
  sessions, 
  readingId, 
  fetchSessions, 
  chartDataLoading, 
  fetchSessionGraphData }) => {

  const [ selectedSession, setSelectedSession ] = useState(null);

  useEffect(() => {
    fetchSessions(user.aspUserId, readingId);
  }, [user, readingId, fetchSessions])

  useEffect(() => {
    if (selectedSession) {
      fetchSessionGraphData(user.aspUserId, selectedSession.id, readingId);
    }
  }, [selectedSession, user, readingId, fetchSessionGraphData])

  const toLabelStr = (startTime, endTime, wordsRead) => {
    const start = toDDMMYYYY(startTime);
    const end = toDDMMYYYY(endTime);

    if (start === end)
      return `${start} ${toHHMM(startTime)} - ${toHHMM(endTime)} read: ${wordsRead}`;
    
    return `${start} ${toHHMM(startTime)} - ${end} ${toHHMM(endTime)} read: ${wordsRead}`;
  }

  return (
    <div className='reading-session-tab'>
      <LoadingAutocomplete 
        value={ selectedSession }
        onChange={ (event, value) => setSelectedSession(value) }
        isLoading={ sessionsLoading }
        options={ sessions }
        groupBy={ o => toDDMMYYYY(new Date(o.startTime)) }
        getOptionLabel={ o => toLabelStr(new Date(o.startTime), new Date(o.endTime), o.wordsRead) }
        renderInput={ params => <TextField {...params} label="Select session" variant="outlined" /> }
      />
      { selectedSession &&
        <ReadingSessionChart
          isLoading={ chartDataLoading }
        />

      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({

  sessionsLoading: selectFetchingDropdownSessions,
  sessions: selectDropdownSessions, 
  user: selectCurrentUser,
  chartDataLoading: selectFetchingSessionGraph 

})

const mapDispatchToProps = dispatch => ({

  fetchSessions: (aspUserId, readingId) => dispatch(fetchDropdownSessionsStart(aspUserId, readingId)), 
  fetchSessionGraphData: (aspUserId, sessionId, readingId) => 
    dispatch(fetchSessionGraphStart(aspUserId, sessionId, readingId))

})

export default connect(mapStateToProps, mapDispatchToProps)(ReadingSessionTab);
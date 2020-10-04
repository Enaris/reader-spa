import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './all-sessions-tab.styles.scss';
import { createStructuredSelector } from 'reselect';
import { fetchReadingGraphStart } from '../../../../../redux/reading-session/reading-session.actions';
import { selectFetchingReadingGraph } from '../../../../../redux/reading-session/reading-session.selectors';
import AllSessionsChart from '../chart/all-sessions-chart.component';
import { selectCurrentUser } from '../../../../../redux/auth/auth.selectors';

const AllSessionsTab = ({ fetchReadingGraph, readingGraphLoading, readingId, user }) => {

  useEffect(() => {
    fetchReadingGraph(user.aspUserId, readingId);
  }, [fetchReadingGraph, user, readingId])

  return (
    <div className='all-sessions-tab'>
      <AllSessionsChart isLoading={ readingGraphLoading } />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  readingGraphLoading: selectFetchingReadingGraph, 
  user: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  fetchReadingGraph: ( aspUserId, readingId ) => dispatch(fetchReadingGraphStart(aspUserId, readingId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllSessionsTab);
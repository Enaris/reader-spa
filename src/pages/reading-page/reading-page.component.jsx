import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './reading-page.styles.scss';
import { createStructuredSelector } from 'reselect';
import { selectReadingOffline } from '../../redux/offline-library/offline-lib.selectors';
import ReadingPageContent from '../../components/application/page-content-containers/reading/reading-content.component';
import { selectSeletedReading, selectSeletedReadingFetching } from '../../redux/library/library.selectors';
import { fetchReadingStart } from '../../redux/library/library.actions';
import { useRouteMatch } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/auth/auth.selectors';

const ReadingPage = ({ user, readingOnline, fetchingReading, readingOffline, fetchReading }) => {

  const { params: { readingId }} = useRouteMatch(); 
  useEffect(() => {
    if (user) {
      fetchReading(user.aspUserId, readingId);
    }
  }, [fetchReading, user, readingId]);

  return (
    <ReadingPageContent reading={ user ? readingOnline : readingOffline } isLoading={ fetchingReading }/>
  )
}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  readingOffline: selectReadingOffline(ownProps.match.params.readingId),
  user: selectCurrentUser, 
  readingOnline: selectSeletedReading, 
  fetchingReading: selectSeletedReadingFetching
})

const mapDispatchToProps = dispatch => ({
  fetchReading: (aspUserId, readingId) => dispatch(fetchReadingStart(aspUserId, readingId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReadingPage);
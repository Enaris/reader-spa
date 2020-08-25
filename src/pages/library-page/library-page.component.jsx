import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './library-page.styles.scss';
import { selectReadingsOffline } from '../../redux/offline-library/offline-lib.selectors';
import { createStructuredSelector } from 'reselect';
import LibraryPageContent from '../../components/application/page-content-containers/library/library-content.component';
import { selectCurrentUser } from '../../redux/auth/auth.selectors';
import { selectReadingsOnline, selectReadingsFetching } from '../../redux/library/library.selectors';
import { fetchReadingsStart } from '../../redux/library/library.actions';

const LibraryPage = ({ user, readingsOnline, readingsOffline, fetchingReadings, fetchReadings }) => {

  useEffect(() => {
    if (user) {
      fetchReadings(user.aspUserId)
    }
  }, [fetchReadings, user])

  return (
    <LibraryPageContent readings={ user ? readingsOnline : readingsOffline } isLoading={ fetchingReadings }/>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  readingsOnline: selectReadingsOnline, 
  fetchingReadings: selectReadingsFetching,
  readingsOffline: selectReadingsOffline
})

const mapDispatchToProps = dispatch => ({
  fetchReadings: aspUserId => dispatch(fetchReadingsStart(aspUserId))
})

export default connect(mapStateToProps, mapDispatchToProps)(LibraryPage);
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './reading-collection.styles.scss';
import ReadingCollection from './reading-collection.component';
import { selectCurrentUser } from '../../../../redux/auth/auth.selectors';
import { selectReadingsOnline, selectReadingsFetching } from '../../../../redux/library/library.selectors';
import { selectFilteredReadings, selectFilters } from '../../../../redux/offline-library/offline-lib.selectors';
import { fetchReadingsStart } from '../../../../redux/library/library.actions';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { setFilters } from '../../../../redux/offline-library/offline-lib.actions';

const ReadingCollectionWrapper = ({ user, 
  fetchReadings, 
  readingsOffline, 
  readingsOnline,
  setFilters,
  fetchingReadings }) => {
  
  const { location } = useHistory();

  useEffect(() => {
    const queryFilters = queryString.parse(location.search, { arrayFormat: 'bracket' });
    setFilters({ title: queryFilters.title, tags: queryFilters.tags });
    if (user) { 
      fetchReadings(user.aspUserId, { 
        title: queryFilters.title ? queryFilters.title : null, 
        tags: queryFilters.tags ? queryFilters.tags : null
      });
    }
  }, [user, location, fetchReadings, setFilters])

  return (
    <ReadingCollection
      readings={ user ? readingsOnline : readingsOffline }
      isLoading={ fetchingReadings }
    />
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  readingsOnline: selectReadingsOnline, 
  readingsOffline: selectFilteredReadings,
  fetchingReadings: selectReadingsFetching,
  filters: selectFilters
})

const mapDispatchToProps = dispatch => ({
  fetchReadings: (aspUserId, filters) => dispatch(fetchReadingsStart(aspUserId, filters)), 
  setFilters: filters => dispatch(setFilters(filters))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReadingCollectionWrapper);
// export default compose(
//   connect(mapStateToProps, mapDispatchToProps), 
//   WSpinner
// )(ReadingCollectionWrapper);
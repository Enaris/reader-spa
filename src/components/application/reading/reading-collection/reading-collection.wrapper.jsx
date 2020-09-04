import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WSpinner from '../../../general/spinner/w-spinner/w-spinner.component';
import './reading-collection.styles.scss';
import ReadingCollection from './reading-collection.component';
import { selectCurrentUser } from '../../../../redux/auth/auth.selectors';
import { selectReadingsOnline, selectReadingsFetching } from '../../../../redux/library/library.selectors';
import { selectFilteredReadings } from '../../../../redux/offline-library/offline-lib.selectors';
import { fetchReadingsStart } from '../../../../redux/library/library.actions';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

const ReadingCollectionWrapper = ({ user, 
  fetchReadings, 
  readingsOffline, 
  readingsOnline,
  fetchingReadings }) => {
  
  const { location } = useHistory();
  useEffect(() => {
    const filters = queryString.parse(location.search, { arrayFormat: 'bracket' });
    if (user) { 
      fetchReadings(user.aspUserId, { 
        title: filters.title ? filters.title : null, 
        tags: filters.tags ? filters.tags : null
      });
    }
  }, [])

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
})

const mapDispatchToProps = dispatch => ({
  fetchReadings: (aspUserId, filters) => dispatch(fetchReadingsStart(aspUserId, filters)), 
})

export default connect(mapStateToProps, mapDispatchToProps)(ReadingCollectionWrapper);
// export default compose(
//   connect(mapStateToProps, mapDispatchToProps), 
//   WSpinner
// )(ReadingCollectionWrapper);
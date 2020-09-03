import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './library-page.styles.scss';
import { selectOfflineTags, selectReadingsOffline, } from '../../redux/offline-library/offline-lib.selectors';
import { createStructuredSelector } from 'reselect';
import LibraryPageContent from '../../components/application/page-content-containers/library/library-content.component';
import { selectCurrentUser } from '../../redux/auth/auth.selectors';
import { selectReadingsOnline, selectReadingsFetching, selectOnlineTags, selectFetchingTags } from '../../redux/library/library.selectors';
import { fetchReadingsStart, fetchTagsStart } from '../../redux/library/library.actions';
import { filterOfflineReadings } from './library-page.utils';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

const LibraryPage = ({ user, 
  readingsOnline, 
  readingsOffline,
  tagsOffilne,
  tagsOnline,
  fetchingReadings,
  fetchingTags,
  fetchTags, 
  fetchReadings }) => {

  const { location } = useHistory();
  const filters = queryString.parse(location.search, { arrayFormat: 'bracket' });

  useEffect(() => {
    if (user) {
      fetchReadings(user.aspUserId, { 
        title: filters.title ? filters.title : null, 
        tags: filters.tags ? filters.tags : null
      });
      fetchTags(user.aspUserId)
    }    
  }, [user, location]);
  
  return (
    <LibraryPageContent 
      readings={ user ? readingsOnline : filterOfflineReadings(readingsOffline, filters) }
      tags={ user ? tagsOnline : tagsOffilne } 
      isLoading={ fetchingReadings || fetchingTags }
    />
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  readingsOnline: selectReadingsOnline, 
  fetchingReadings: selectReadingsFetching,
  readingsOffline: selectReadingsOffline,
  tagsOffilne: selectOfflineTags, 
  tagsOnline: selectOnlineTags,
  fetchingTags: selectFetchingTags
})

const mapDispatchToProps = dispatch => ({
  fetchReadings: (aspUserId, filters) => dispatch(fetchReadingsStart(aspUserId, filters)), 
  fetchTags: aspUserId => dispatch(fetchTagsStart(aspUserId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LibraryPage);
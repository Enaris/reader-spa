import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectFetchingTags, selectOnlineTags, selectSeletedReadingFetching, selectSeletedReading } from '../../../redux/library/library.selectors';
import { selectOfflineTags, selectReadingOffline } from '../../../redux/offline-library/offline-lib.selectors';
import { fetchTagsStart, fetchReadingStart } from '../../../redux/library/library.actions';
import { selectCurrentUser } from '../../../redux/auth/auth.selectors';
import ReadingEditForm from './reading-edit-form.component';

const ReadingEditFormWrapper = ({ user, 
  tagsOffilne, 
  tagsOnline, 
  fetchTags, 
  fetchingTags,
  fetchReading,
  fetchingReading, 
  readingOnline, 
  readingOffline, 
  readingId
  }) => {
  
  useEffect(() => {
    if (user) {
      fetchReading(user.aspUserId, readingId)
      fetchTags(user.aspUserId); 
    } 
  }, [user, fetchTags, fetchReading, readingId]);

  return (
    <React.Fragment>
      { (readingOnline || readingOffline) &&
        <ReadingEditForm
          tagsOptions={ user ? tagsOnline : tagsOffilne }
          isLoading={ fetchingTags || fetchingReading }
          reading={ user ? readingOnline : readingOffline }
          readingId={ readingId }
        />
      }
    </React.Fragment>
  )
}

const mapStateToProps = (state, props) => createStructuredSelector({
  readingOffline: selectReadingOffline(props.readingId),
  user: selectCurrentUser,
  tagsOffilne: selectOfflineTags, 
  tagsOnline: selectOnlineTags,
  fetchingTags: selectFetchingTags, 
  fetchingReading: selectSeletedReadingFetching, 
  readingOnline: selectSeletedReading
})

const mapDispatchToProps = dispatch => ({
  fetchTags: aspUserId => dispatch(fetchTagsStart(aspUserId)),
  fetchReading: (aspUserId, readingId) => dispatch(fetchReadingStart(aspUserId, readingId)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(ReadingEditFormWrapper);

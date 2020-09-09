import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReadingSearchForm from './reading-search-form.component';
import { selectFetchingTags, selectOnlineTags } from '../../../redux/library/library.selectors';
import { selectOfflineTags } from '../../../redux/offline-library/offline-lib.selectors';
import { fetchTagsStart } from '../../../redux/library/library.actions';
import { selectCurrentUser } from '../../../redux/auth/auth.selectors';

const ReadingSearchWrapper = ({ user, 
  tagsOffilne, 
  tagsOnline, 
  fetchTags, 
  fetchingTags }) => {
  
  useEffect(() => {
    if (user) {
      fetchTags(user.aspUserId)
    } 
  }, [user, fetchTags])

  return (
    <ReadingSearchForm
      tagsOptions={ user ? tagsOnline : tagsOffilne }
      isLoading={ fetchingTags }
    />
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  tagsOffilne: selectOfflineTags, 
  tagsOnline: selectOnlineTags,
  fetchingTags: selectFetchingTags
})

const mapDispatchToProps = dispatch => ({
  fetchTags: aspUserId => dispatch(fetchTagsStart(aspUserId)), 
})

export default connect(mapStateToProps, mapDispatchToProps)(ReadingSearchWrapper);
// export default compose(
//   connect(mapStateToProps, mapDispatchToProps), 
//   WSpinner
// )(ReadingSearchWrapper);
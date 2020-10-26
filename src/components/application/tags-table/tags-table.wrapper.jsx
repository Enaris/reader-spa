import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/auth/auth.selectors';
import { fetchTableTagsStart } from '../../../redux/library/library.actions';
import { selectFetchingOnlineTableTags, selectOnlineTableTags } from '../../../redux/library/library.selectors';
import { selectOfflineTagsForTable } from '../../../redux/offline-library/offline-lib.selectors';
import TagsTable from './tags-table.component';

const TagsTableWrapper = ({ fetchTableTags, user, tagsOnline, tagsOffline, fetchingOnlineTags }) => {

  useEffect(() => {
    if (user) {
      fetchTableTags(user.aspUserId);
    }
  }, [fetchTableTags, user])

  return (
    <TagsTable 
      isLoading={ fetchingOnlineTags }
      tags={ user ? tagsOnline : tagsOffline }
      user={ user }
    />
  )
}

const mapDispatchToProps = dispatch => ({
  fetchTableTags: aspUserId => dispatch(fetchTableTagsStart(aspUserId))
})

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  tagsOffline: selectOfflineTagsForTable,
  tagsOnline: selectOnlineTableTags,  
  fetchingOnlineTags: selectFetchingOnlineTableTags
})

export default connect(mapStateToProps, mapDispatchToProps)(TagsTableWrapper);
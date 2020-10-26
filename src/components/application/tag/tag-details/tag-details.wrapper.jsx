import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../../redux/auth/auth.selectors';
import { fetchTagDetailsStart } from '../../../../redux/library/library.actions';
import { selectFetchingTagDetails, selectOnlineTagDetails } from '../../../../redux/library/library.selectors';
import { selectOfflineTagDetails } from '../../../../redux/offline-library/offline-lib.selectors';
import TagDetails from './tag-details.component';

const TagDetailsWrapper = ({ user, 
  fetchingTagDetails,
  tagDetailsOnline,
  fetchTagDetails, 
  tagDetailsOffline, 
  tagId }) => {

  useEffect(() => {
    if (user) {
      fetchTagDetails(user.aspUserId, tagId);
    }
  }, [fetchTagDetails, user, tagId])

  return (
    <TagDetails
      isLoading={ fetchingTagDetails }
      tag={ user ? tagDetailsOnline : tagDetailsOffline }
      user={ user }
    />
  )
}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  user: selectCurrentUser,
  tagDetailsOffline: selectOfflineTagDetails(ownProps.tagId),
  fetchingTagDetails: selectFetchingTagDetails, 
  tagDetailsOnline: selectOnlineTagDetails
})

const mapDispatchToProps = dispatch => ({
  fetchTagDetails: (apsUserId, tagId) => dispatch(fetchTagDetailsStart(apsUserId, tagId))
})

export default connect(mapStateToProps, mapDispatchToProps)(TagDetailsWrapper);
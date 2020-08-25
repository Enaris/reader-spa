import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './text-add-page.styles.scss';
import { selectOfflineTags } from '../../redux/offline-library/offline-lib.selectors';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/auth/auth.selectors';
import { fetchTagsStart } from '../../redux/library/library.actions';
import { selectOnlineTags, selectFetchingTags } from '../../redux/library/library.selectors';
import TextAddContent from '../../components/application/page-content-containers/text-add/text-add-content.component';


const TextAddPage = ({ user, offlineTags, onlineTags, fetchTags, isLoading }) => {

  useEffect(() => {
    if (user) {
      fetchTags(user.aspUserId)
    }
  }, [user, fetchTags])

  return (
    <TextAddContent 
      tags={ user ? onlineTags : offlineTags }
      isLoading={ isLoading }
    />
  )
}

const mapStateToProps = createStructuredSelector({
  offlineTags: selectOfflineTags, 
  onlineTags: selectOnlineTags,
  user: selectCurrentUser, 
  isLoading: selectFetchingTags
})

const mapDispatchToProps = dispatch => ({
  fetchTags: aspUserId => dispatch(fetchTagsStart(aspUserId)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(TextAddPage);

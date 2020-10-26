import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import './tag-details.styles.scss'
import WSpinner from '../../../general/spinner/w-spinner/w-spinner.component';
import { Button } from '@material-ui/core';
import YNModal from '../../../general/y-n-modal/y-n-modal.component';
import { deleteTagOnlineStart } from '../../../../redux/library/library.actions';
import { removeTagOffline } from '../../../../redux/offline-library/offline-lib.actions';

const TagDetails = ({ tag, user, removeTagOnline, removeTagOffline, isLoading }) => {

  const [ confirmDelete, setConfirmDelete ] = useState(false);
  const { push } = useHistory();

  const deleteTag = () => {
    if (user) {
      removeTagOnline(user.aspUserId, tag.id);
    }
    else {
      push('/tags');
      removeTagOffline(tag.id);
    }
  }

  return (
    <div className='tag-details'>
      { tag &&
        <React.Fragment>
          <h3 className='mb5'>{ tag.name }</h3>
          <div className='mb5' >Readings: </div>
          <ul className='mb5'>
            { tag.readings.map(r => <li key={ r.id }>
              <Link 
                to={ `/lib/${r.id}` }
              >
                { r.title }
              </Link>
            </li>)
            }
          </ul>
          { tag.meanWpm &&
            <div className='mb5'>{ `Mean wpm: ${tag.meanWpm > 0 ? tag.meanWpm.toFixed(2) : '-'}` }</div>
          }
          { tag.meanCpm &&
            <div className='mb5'>{ `Mean cpm: ${tag.meanCpm > 0 ? tag.meanCpm.toFixed(2) : '-'}` }</div>
          }
          <Button
            variant='outlined'
            color='primary'
            onClick={() => setConfirmDelete(true)}
          >
            Delete
          </Button>
          <YNModal
            open={ confirmDelete }
            onClose={() => setConfirmDelete(false)}
            onNo={() => setConfirmDelete(false)}
            onYes={() => deleteTag()}
          />
        </React.Fragment>
      }
    </div>
  )
}


const mapDispatchToProps = dispatch => ({
  removeTagOnline: (aspUserId, tagId) => dispatch(deleteTagOnlineStart(aspUserId, tagId)),
  removeTagOffline: tagId => dispatch(removeTagOffline(tagId))
})

export default compose(
  connect(null, mapDispatchToProps),
  WSpinner
)(TagDetails);
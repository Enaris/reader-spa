import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../../redux/auth/auth.selectors';
import { selectReadingsOfflineAny } from '../../../../redux/offline-library/offline-lib.selectors';
import ExportLibBtn from '../export-lib-btn/export-lib-btn.component';
import ImportLibBtn from '../import-lib-btn/import-lib-btn.component';
import './import-export-btns.styles.scss';

const ImportExportBtns = ({ user, readingsExists }) => {
  return (
    <React.Fragment>
      { !user &&
        <div className='import-export'>
          { readingsExists && 
            <ExportLibBtn />
          }
          <ImportLibBtn />
        </div>
      }
    </React.Fragment>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  readingsExists: selectReadingsOfflineAny
})

export default connect(mapStateToProps)(ImportExportBtns);
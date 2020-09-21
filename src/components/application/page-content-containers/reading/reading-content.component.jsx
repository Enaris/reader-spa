import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import './reading-content.styles.scss';
import ReadingDetails from '../../reading/reading-details/reading-details.component';
import WSpinner from '../../../general/spinner/w-spinner/w-spinner.component';
import { createStructuredSelector } from 'reselect';
import { selectDeletingReadingOnline } from '../../../../redux/library/library.selectors';

const ReadingPageContent = ({ reading }) => {

  return (
    <div className='reading-page flex_wh100 flex-column p5'>
      { reading && 
        <ReadingDetails reading={ reading } />
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectDeletingReadingOnline
})

export default compose(
  connect(mapStateToProps),
  WSpinner
)(ReadingPageContent);
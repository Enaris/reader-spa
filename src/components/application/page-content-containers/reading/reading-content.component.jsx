import React from 'react';
import { compose } from 'redux';
import './reading-content.styles.scss';
import ReadingDetails from '../../reading/reading-details/reading-details.component';
import WSpinner from '../../../general/spinner/w-spinner/w-spinner.component';

const ReadingPageContent = ({ reading }) => {

  return (
    <div className='reading-page flex_wh100 flex-column p5'>
      { reading && 
        <ReadingDetails reading={ reading } />
      }
    </div>
  )
}

export default compose(
  WSpinner
)(ReadingPageContent);
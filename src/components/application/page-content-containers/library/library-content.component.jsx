import React from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './library-content.styles.scss';
import ReadingCollection from '../../reading/reading-collection/reading-collection.component';
import WSpinner from '../../../general/spinner/w-spinner/w-spinner.component';

const LibraryPageContent = ({ readings, isLoading }) => {


  return (
    <div className='library-page flex_wh100 flex-column'>
      <Link to='text/add'>
        <Button 
          variant='outlined'
          color='primary'
        > 
          Add text
        </Button>
      </Link>
      <ReadingCollection readings={ readings } />
    </div>
  )
}

export default compose(
  WSpinner
)(LibraryPageContent);
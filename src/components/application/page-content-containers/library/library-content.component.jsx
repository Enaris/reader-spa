import React, { useState } from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Button, Switch, FormControlLabel } from '@material-ui/core';
import './library-content.styles.scss';
import ReadingCollection from '../../reading/reading-collection/reading-collection.component';
import WSpinner from '../../../general/spinner/w-spinner/w-spinner.component';
import ReadingSearchForm from '../../../forms/reading-search-form/reading-search-form.component';

const LibraryPageContent = ({ readings, isLoading, tags }) => {

  const [ expandSearch, setExpandSearch ] = useState(false);

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
      <FormControlLabel 
        value={ expandSearch }
        onChange={ e => setExpandSearch(e.target.checked) }
        control={<Switch color='primary' checked={ expandSearch } />} 
        label='Search'
      /> 
      { expandSearch &&
        <ReadingSearchForm 
          tagsOptions={ tags }
        />
      }
      <ReadingCollection readings={ readings } />
    </div>
  )
}

export default compose(
  WSpinner
)(LibraryPageContent);
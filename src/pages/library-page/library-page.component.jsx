import React from 'react';
import { Link } from 'react-router-dom';
import './library-page.styles.scss';
import { Button } from '@material-ui/core';
import ReadingSearchFormWrapper from '../../components/forms/reading-search-form/reading-search-form.wrapper';
import ReadingCollectionWrapper from '../../components/application/reading/reading-collection/reading-collection.wrapper';
import { useHistory } from 'react-router-dom';
import ImportExportBtns from '../../components/application/buttons/import-export-btns/import-export-btns.component';

const LibraryPage = () => {
  const { location } = useHistory();
  return (
    <div className='library-page flex_wh100 flex-column'>
      <ImportExportBtns />
      <Link to='text/add'>
        <Button 
          variant='outlined'
          color='primary'
        > 
          Add text
        </Button>
      </Link>
      <Link to='tags/'>
        <Button 
          variant='outlined'
          color='primary'
        > 
          Tags
        </Button>
      </Link>
      <ReadingSearchFormWrapper key={ `tags ${location.search}` } />
      <ReadingCollectionWrapper key={ `readings ${location.search}` } />
      
    </div>
  )
}


export default LibraryPage;
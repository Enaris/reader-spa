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
    <div className='library-page flex_wh100 flex-column p5'>
      <ImportExportBtns containerClass='mb5px' />
      <Link to='text/add' className='mb5px'>
        <Button 
          variant='outlined'
          color='primary'
        > 
          Add text
        </Button>
      </Link>
      <Link to='tags/' className='mb5'>
        <Button 
          variant='outlined'
          color='primary'
        > 
          Tags
        </Button>
      </Link>
      <ReadingSearchFormWrapper key={ `tags ${location.search}` } containerClass='mb5' />
      <ReadingCollectionWrapper key={ `readings ${location.search}` } />
      
    </div>
  )
}


export default LibraryPage;
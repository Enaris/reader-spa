import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './library-page.styles.scss';

const LibraryPage = () => {

  return (
    <div className='library-page'>
      <Link to='text/add'>
        <Button 
          variant='outlined'
          color='primary'
        > 
          Add text
        </Button>
      </Link>
      Lib to be
    </div>
  )
}

export default LibraryPage;
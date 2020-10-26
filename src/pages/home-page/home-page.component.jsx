import React from 'react';
import { Link } from 'react-router-dom';
import './home-page.styles.scss';
import { Button } from '@material-ui/core';
import LibraryBooks from '@material-ui/icons/LibraryBooks';

const HomePage = () => {

  return (
    <div className='home-page'>
      <Link to='lib'>
        <Button
          variant='outlined'
          startIcon={<LibraryBooks />}
        >
          Library
        </Button>
      </Link>
      <Link to='/reader/new'>
        <Button
          variant='outlined'
          startIcon={<LibraryBooks />}
        >
          Read text
        </Button>
      </Link>
    </div>
  )
}

export default HomePage;
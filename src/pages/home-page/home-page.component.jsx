import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './home-page.styles.scss';
import { Button } from '@material-ui/core';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import { setTestMode } from '../../redux/reader/reader.actions';
import { setSpeedOptions } from '../../redux/reader-options/reader-options.actions';


const HomePage = ({ setTestMode, setSpeedOptions }) => {

  const { push } = useHistory();
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
      <Link to='/reader/new/test'>
        <Button
          variant='outlined'
          startIcon={<LibraryBooks />}
        >
          Speed test
        </Button>
      </Link>
      {/* <Button
        variant='outlined'
        startIcon={<LibraryBooks />}
        onClick={() => {
          setTestMode(true);
          push('/reader/new');
          setSpeedOptions({
            initialCPM: -1, 
            initialWPM: 300, 
            targetWPM: -1, 
            targetCPM: -1, 
            breakIfLonger: -1, 
            slowIfLonger: -1, 
            appendIfShorter: -1, 
            maxAppend: -1, 
            initialAccelerationTimeSecs: -1, 
            addPerMin: 340, 
            slowTo: -1 
          });
        }}
      >
        Speed test
      </Button> */}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setTestMode: val => dispatch(setTestMode(val)),
  setSpeedOptions: opt => dispatch(setSpeedOptions(opt))
})

export default connect(null, mapDispatchToProps)(HomePage);
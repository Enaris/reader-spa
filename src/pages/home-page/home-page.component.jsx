import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './home-page.styles.scss';
import { Button } from '@material-ui/core';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import LocalLibrary from '@material-ui/icons/LocalLibrary';
import Speed from '@material-ui/icons/Speed';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/auth/auth.selectors';
import { logout } from '../../redux/auth/auth.actions';

const HomePage = ({ user, logout }) => {

  return (
    <div className='home-page'>
      <div className='home-page-btns'>
        <Link to='lib' className='home-btn-link mb5'>
          <Button
            fullWidth
            variant='outlined'
            startIcon={<LibraryBooks />}
          >
            Library
          </Button>
        </Link>
        <Link to='/reader/new' className='home-btn-link mb5'>
          <Button
            fullWidth
            variant='outlined'
            startIcon={<LocalLibrary />}
          >
            Read text
          </Button>
        </Link>
        <Link to='/reader/new/test' className='home-btn-link mb5'>
          <Button
            fullWidth
            variant='outlined'
            startIcon={<Speed />}
          >
            Speed test
          </Button>
        </Link>
        
        { user ?
          <div className='home-btn-link'>
            <Button
              fullWidth
              variant='outlined'
              startIcon={<ExitToApp />}
              onClick={() => logout()}
            >
              Logout
            </Button>
          </div>
          :
          <Link to='/login' className='home-btn-link'>
            <Button
              fullWidth
              variant='outlined'
              startIcon={<AccountCircle />}
            >
              Login
            </Button>
          </Link>
        }
        
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
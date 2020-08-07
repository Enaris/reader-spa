import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import './nav-bar.styles.scss';
import { Tooltip } from '@material-ui/core';
const NavBar = () => {

  return (
    <div className='nav-bar'>
      <div className='nav-links'>
        <NavLink to='/' exact activeClassName='icon-link-active'>
          <Tooltip title='Home' placement='right'><HomeIcon /></Tooltip> 
        </NavLink>
        <NavLink to='/lib' exact activeClassName='icon-link-active'> 
          <Tooltip title='Library' placement='right'><LibraryBooksIcon /></Tooltip>
        </NavLink>
      </div>
    </div>
  )
}

export default NavBar;
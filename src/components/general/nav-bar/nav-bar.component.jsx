import React from 'react';
import { NavLink } from 'react-router-dom';
import './nav-bar.styles.scss';

const NavBar = () => {

  return (
    <div className='nav-bar'>
      <NavLink to='/'> HOME </NavLink>
      <NavLink to='/lib'> LIBRARY </NavLink>   
    </div>
  )
}

export default NavBar;
import React from 'react';
import './bttn.styles.scss';

const Bttn = ({ className, label, ...otherProps }) => {

  return (
    <button className={ `${className} bttn` } { ...otherProps } >
      { label }
    </button>
  ) 
}

export default Bttn;
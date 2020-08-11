import React from 'react';
import './spinner-overlay.styles.scss';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SpinnerOverlay = ({ Spinner }) => {

  return (
    <div className='spinner-overlay'>
      <FontAwesomeIcon icon={ faCircleNotch } spin/>
    </div>
  )
}

export default SpinnerOverlay;
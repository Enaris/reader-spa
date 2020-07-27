import React from 'react';
import './silder.styles.scss';

const Slider = ({ className, ...otherProps }) => {

  return (
    <div className={`${className} slider-container`}>
      <input className='slider' type='range' { ...otherProps } />
    </div>
  )
}

export default Slider;
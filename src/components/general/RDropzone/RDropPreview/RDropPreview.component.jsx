import React, { useState, useEffect } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';

import './RDropPreview.styles.scss';

import RDrop from '../RDrop/RDrop.component';
import { IconButton } from '@material-ui/core';

const RDropPreview = ({ maxSize, label, initImage, onRemove, handleDrop, errorsInside }) => {
  const [image, setImage] = useState(null); 

  useEffect(() => {
    if (initImage)
      setImage(initImage);
  }, [initImage])

  const onDrop = file => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImage(fileReader.result)
    };
    fileReader.readAsDataURL(file);
    if (handleDrop) {
      handleDrop(file);
    }
  }

  const onXClick = () => {
    setImage(null);
    if (onRemove)
      onRemove();
  }

  return (
    <div className='flex_wh100'>
      {
        image ?
        <div className='preview-container'>
          <IconButton 
            onClick={ () => onXClick() }
            className='preview-x-btn'
          >
            <CancelIcon />
          </IconButton>
          <div className='preview-image-container'>
            <img src={ image } alt='drop preview' className='preview-image' />
          </div>
        </div>
        :
        <RDrop 
          label={ label }
          multiple={ false } 
          acceptTypes={[ 'image/*' ]} 
          handleAccepted={ onDrop } 
          handleRejected={ () => setImage(null) }
          errorsInside={ errorsInside }
        />
      }
    </div>
  )
}

export default RDropPreview;
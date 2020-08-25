import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import './reading-card.styles.scss';
import { imageUrl } from '../../../../utils/api-urls';

const ReadingCard = ({ reading }) => {
  
  return (
    <Tooltip title={reading.title}>
      <Link to={`/lib/${reading.id}`}>
        <div className='reading-card'>
          <div className='reading-card-image-container'>
            <div className='reading-card-image'>
              <img src={ imageUrl(reading.coverUrl) } alt='cover' className='cover-image' />
            </div>
          </div>
          <div className='reading-card-desc-container'>
            <div className='reading-card-title'>
              { reading.title }
            </div>
            <div>
              { reading.id }
            </div>
          </div>
        </div>
      </Link>
    </Tooltip>
    
  )
}

export default ReadingCard;
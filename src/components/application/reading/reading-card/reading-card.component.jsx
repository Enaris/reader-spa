import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, Chip } from '@material-ui/core';
import './reading-card.styles.scss';
import { imageUrl } from '../../../../utils/api-urls';

const ReadingCard = ({ imageCard, reading }) => {
  
  const coverSrc = reading.coverUrl ? imageUrl(reading.coverUrl) : 'no cover.jpg';

  return (
    <Tooltip title={reading.title}>
      <div className='reading-card'>
        { imageCard &&
          <Link to={`/lib/${reading.id}`}>
            <div className='reading-card-image-container'>
              <div className='reading-card-image'>
                <img src={ coverSrc } alt='cover' className='cover-image' />
              </div>
            </div>
          </Link>
        }
        <div className='reading-card-desc-container'>
          <h4 className='reading-card-desc-title'>
            <Link to={`/lib/${reading.id}`}>{ reading.title }</Link> 
          </h4>
          <div className='reading-card-desc-tags'>
            {
              reading.tags.map(t => {
                return <Chip 
                  className='mr5px'
                  size='small'
                  label={t.name} 
                  key={t.id} 
                />
              })
            }
          </div>
        </div>
      </div>
    </Tooltip>
    
  )
}

export default ReadingCard;
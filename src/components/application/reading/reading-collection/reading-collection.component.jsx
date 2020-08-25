import React from 'react';
import './reading-collection.styles.scss';
import ReadingCard from '../reading-card/reading-card.component';

const ReadingCollection = ({ readings }) => {
  
  return (
    <div className='reading-collectioin'>
      { readings && readings.length > 0 &&
        readings.map(r => <ReadingCard key={r.id} reading={ r } />)
      }
    </div>
  )
}

export default ReadingCollection;
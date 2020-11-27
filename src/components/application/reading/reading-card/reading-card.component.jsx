import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Tooltip, Chip } from '@material-ui/core';
import './reading-card.styles.scss';
import { imageUrl } from '../../../../utils/api-urls';
import queryString from 'query-string';
import { setFilters } from '../../../../redux/offline-library/offline-lib.actions';

const ReadingCard = ({ imageCard, reading, setFilters }) => {
  
  const { push, location } = useHistory();
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
          <h5 className='reading-card-desc-title'>
            <Link to={`/lib/${reading.id}`}>{ reading.title }</Link> 
          </h5>
          <div className='reading-card-desc-tags'>
            {
              reading.tags.map(t => {
                return <Chip 
                  className='mr5px'
                  size='small'
                  label={t.name} 
                  key={t.id} 
                  clickable
                  onClick={() => {
                    push({
                      pathname: location.pathname, 
                      search: queryString.stringify({ tags: [ t.id ] }, { arrayFormat: 'bracket' })
                    })
                  }}
                />
              })
            }
          </div>
        </div>
      </div>
    </Tooltip>
    
  )
}

const mapDispatchToProps = dispatch => ({
  setFilters: filters => dispatch(setFilters(filters)) 
})

export default connect(null, mapDispatchToProps)(ReadingCard);
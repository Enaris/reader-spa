import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './reading-details.styles.scss';
import { Chip, Button, FormControlLabel, Switch } from '@material-ui/core';
import { imageUrl } from '../../../../utils/api-urls';
import { processTextStart } from '../../../../redux/reading/reading.actions';

const ReadingDetails = ({ reading, processText }) => {

  const { push } = useHistory();

  const [ expandText, setExpandText ] = useState(false);

  const handleReadBtn = () => {
    processText(reading.text);
    push('/reader');
  }

  return (
    <div className='reading-details'>
      <div className='reading-details-top-section'>
        <div className='reading-details-cover'>
          <div className='reading-details-cover-container'>
            <img 
              src={ reading.coverUrl ? imageUrl(reading.coverUrl) : '/no cover.jpg' } 
              alt='cover' 
              className='reading-details-cover-image' 
            />
          </div>
        </div>
        
        <div className='reading-details-top-info'>
          <h3 className='reading-details-title'>{ reading.title }</h3>
          <div className='reading-details-author'> Author todo </div>
          <div className='reading-details-position'>{ reading.savedLocation }</div>
          { reading.tags && reading.tags.length > 0 &&
            <div className='reading-details-tags-container'>
              <span>Tags: </span>
              <div className='reading-details-tags'>
                {
                  reading.tags.map(t => <Chip 
                    className='mr5px'
                    label={t.name} 
                    key={t.id} 
                  />)
                }
              </div>
            </div>
          }
          <div>
            <div className='mr5px'>
              <Button
                variant='outlined'
                color='primary'
                onClick={() => handleReadBtn()}
              >
                READ
              </Button>
            </div>
            <div className='mr5px'>
              <Button
                variant='outlined'
                color='primary'
              >
                EDIT
              </Button>
            </div>
          </div>
        </div>
        
      </div>
      <div className='reading-details-bot-section'>
        <div className='reading-details-desc'>{ reading.description }</div>
        <div className='reading-details-links'>{ reading.links }</div>
        <FormControlLabel
          value={expandText}
          onChange={(e, v) => setExpandText(v)}
          control={<Switch color='primary' checked={expandText} />} 
          label='Expand reading text'
        />
        { expandText &&
          <div className='reading-details-text'>{ reading.text }</div>
        }
        <div className='reading-details-speed'> SPEED TODO </div>
        <div className='reading-details-stats'> STATS TODO </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  processText: text => dispatch(processTextStart(text)), 
})

export default connect(null, mapDispatchToProps)(ReadingDetails);
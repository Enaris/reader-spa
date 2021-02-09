import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './reading-details.styles.scss';
import { Chip, Button, Tabs, Tab } from '@material-ui/core';
import { imageUrl } from '../../../../utils/api-urls';
import { processTextStart, setReadingId } from '../../../../redux/reading/reading.actions';
import { setCurrentPartByIndex } from '../../../../redux/reader/reader.actions';
import YNModal from '../../../general/y-n-modal/y-n-modal.component';
import { removeReadingOffline } from '../../../../redux/offline-library/offline-lib.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../../redux/auth/auth.selectors';
import { deleteReadingOnlineStart } from '../../../../redux/library/library.actions';
import ReadingSessionTab from '../../charts/reading-session-chart/tab/reading-session-tab.component';
import { a11yProps } from '../../../../utils/material-ui-helpers';
import TabPanel from '../../../general/tab-panel/tab-panel.component';
import AllSessionsTab from '../../charts/all-sessions-chart/tab/all-sessions-tab.component';

const ReadingDetails = ({ reading, 
  user,
  processText, 
  setCurrentPartByIndex, 
  setReadingId, 
  removeReadingOnline,
  removeReadingOffline }) => {

  const { location, push } = useHistory();
  
  const [ openConfirmDelete, setOpenConfirmDelete ] = useState(false);

  const [ tabIndex, setTabIndex ] = useState(0);

  const handleReadBtn = () => {
    setReadingId(reading.id);
    processText(reading.text);
    setCurrentPartByIndex(reading.savedLocation === 0 ? 0 : reading.savedLocation - 1);
    // if (reading.savedLocation !== 0) {
    //   setCurrentPartByIndex(reading.savedLocation -);
    // }
    push('/reader');
  }

  const handleConfirmDelete = () => {
    if (user) {
      removeReadingOnline(user.aspUserId, reading.id);
    }
    else {
      push('/lib');
      removeReadingOffline(reading.id);
    }
    setOpenConfirmDelete(false);
  }
  const handleDoNotDelete = () => {
    setOpenConfirmDelete(false);
  }

  const lastSessionText = reading.savedLocation === 0 ? 'Text not read yet' 
    : `Last session saved at word: ${reading.savedLocation}${user ? ' of ' + reading.totalWords + '.' : '.' }`;
  return (
    <div className='reading-details'>
      <div className='reading-details-top-section mb5px'>
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
          <h2 className='reading-details-title mb5'>{ reading.title }</h2>
          <div className='reading-details-position mb5px'>
            { lastSessionText }
          </div>
          { reading.tags && reading.tags.length > 0 &&
            <div className='reading-details-tags-container mb5px'>
              <span className='mb5px'>Reading tags: </span>
              <div className='reading-details-tags'>
                {
                  reading.tags.map(t => <Chip 
                    className='mr5px'
                    label={ t.name } 
                    key={ t.id } 
                  />)
                }
              </div>
            </div>
          }
          <div className='reading-details-btns'>
            <Button
              fullWidth
              variant='outlined'
              color='primary'
              onClick={() => handleReadBtn()}
            >
              READ
            </Button>
            <Button
              fullWidth
              variant='outlined'
              color='primary'
              onClick={() => push(`${location.pathname}/edit`)}
            >
              EDIT
            </Button>
            <Button
              fullWidth
              variant='outlined'
              color='primary'
              onClick={() => setOpenConfirmDelete(true) }
            >
              DELETE
            </Button>
          </div>
          <YNModal 
            open={ openConfirmDelete }
            onYes={ handleConfirmDelete }
            onNo={ handleDoNotDelete }
            onClose={ () => setOpenConfirmDelete(false) }
          />
        </div>
        
      </div>
      <div className='reading-details-bot-section'>
        <div className='reading-details-desc mb5px'>
          { reading.description && `Description: ${reading.description}` }
        </div>
        <div 
          className='reading-details-links mb5px'
          dangerouslySetInnerHTML={{ __html: reading.links && `Links: ${reading.links}` }}  
        >
          
        </div>
        { user && 
          <>
            <Tabs value={ tabIndex } onChange={ (e, v) => setTabIndex(v) } aria-label="chart-desc-tabs">
              <Tab label="Sessions charts" { ...a11yProps(0) } />
              <Tab label="Overall chart" { ...a11yProps(1) } />
              <Tab label="Text" { ...a11yProps(2) } />
            </Tabs>
            <TabPanel value={ tabIndex } index={0}>
              <ReadingSessionTab 
                readingId={ reading.id }
              />
            </TabPanel>
            <TabPanel value={ tabIndex } index={1}>
              <AllSessionsTab 
                readingId={ reading.id }
              />
            </TabPanel>
            <TabPanel value={ tabIndex } index={2}>
              { reading.text }
            </TabPanel>
          </>
        }
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  processText: text => dispatch(processTextStart(text)), 
  setCurrentPartByIndex: index => dispatch(setCurrentPartByIndex(index)), 
  setReadingId: id => dispatch(setReadingId(id)), 
  removeReadingOffline: readingId => dispatch(removeReadingOffline(readingId)), 
  removeReadingOnline: (aspUserId, readingId) => dispatch(deleteReadingOnlineStart({ aspUserId, readingId }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReadingDetails);
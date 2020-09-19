import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import './reading-edit-form.styles.scss';
import RDropPreview from '../../general/RDropzone/RDropPreview/RDropPreview.component';
import RField from '../../general/formik/RField/RField.component';
import RAutocomplete from '../../general/formik/RAutocomplete/RAutocomplete.component';
import { TextField, Chip, Button, FormControlLabel, Switch } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { Formik, Form } from 'formik';
import NewTag from '../../general/new-tag/new-tag.component';
import { isNullOrWhitespace } from '../../../utils/string-helpers';
import WSpinner from '../../general/spinner/w-spinner/w-spinner.component';
import { selectCurrentUser } from '../../../redux/auth/auth.selectors';
import { createStructuredSelector } from 'reselect';
import { imageUrl } from '../../../utils/api-urls';
import { toOfflineUpdateData, toOnlineUpdateData } from './reading-edit-form.utils';
import { updateReadingOfflineStart } from '../../../redux/offline-library/offline-lib.actions';
import { updateReadingOnlineStart } from '../../../redux/library/library.actions';

const ReadingEditForm = ({ user, reading, readingId, tagsOptions, updateReadingOffline, updateReadingOnline }) => {

  const [newCover, setNewCover] = useState(null);
  const [tagsAdded, setTagsAdded] = useState([]);
  const [tagsRemoved, setTagsRemoved] = useState([]);
  const [readingTags, setReadingTags] = useState(reading && reading.tags ? reading.tags : []);
  const [removeOldCover, setRemoveOldCover] = useState(false);
  const [changeText, setChangeText] = useState(false);

  const handleRemoveImg = () => {
    setRemoveOldCover(true);
  }
  const handleDropImg = img => {
    setNewCover(img);
  }
  const handleSubmit = v => {
    if (user) {
      const updateData = toOnlineUpdateData(v, 
        user.aspUserId, 
        readingId, 
        tagsRemoved, 
        v.tags, 
        tagsAdded, 
        changeText, 
        newCover, 
        removeOldCover);
      updateReadingOnline(updateData);
    }
    else {
      var data = toOfflineUpdateData(v, readingId, tagsRemoved, v.tags, tagsAdded, readingTags);
      updateReadingOffline( data, changeText );
    }
  }
  const handleRemoveNewTag = tag => {
    setTagsAdded(tagsAdded.filter(item => tag.id !== item.id)); 
  }
  const handleAddNewTag = addedTag => {
    if (isNullOrWhitespace(addedTag))
      return;
    if ((tagsOptions && tagsOptions.some(tag => tag.name === addedTag)) 
      || (tagsAdded && tagsAdded.some(tag => tag.name === addedTag))
      || (readingTags.some(tag => tag.name === addedTag))) {
      return;
    }
    setTagsAdded([...tagsAdded, {id: addedTag, name: addedTag}]); 
  }
  const handleRemoveOldTag = tag => {
    setTagsRemoved([ ...tagsRemoved, tag ]);
    setReadingTags(readingTags.filter(t => t.id !== tag.id))
  }

  return (
    <div className='reading-edit-form min-vw50'>
      { user &&
        <div className='added-image-container mb5'>
          <div className='added-image'>
            <RDropPreview 
              label='Add cover image'
              onRemove={ handleRemoveImg }
              handleDrop={ handleDropImg }
              initImage={ imageUrl(reading.coverUrl) }
            />
          </div>
        </div>
      }
      <Formik 
        initialValues={{
          title: reading.title ? reading.title : '',
          text: reading.text ? reading.text : '',
          description: reading.description ? reading.description : '', 
          links: reading.links ? reading.links : '', 
          tags: [], 
        }}
        onSubmit={ v => handleSubmit(v) }
      >
        { props => {
          
          return (
          <Form >
            <RField 
              containerClass='mb5' 
              fullWidth 
              name='title' 
              label='Title' 
              variant='outlined' 
              color='primary' 
            />
            
            <div className='reading-edit-form-change-text'>
              <FormControlLabel 
                value={ changeText }
                onChange={ e => setChangeText(e.target.checked) }
                control={<Switch color='primary' checked={ changeText } />} 
                label='Change text'
              />
              <div className={ changeText ? 'errors' : '' }>
                Changing text will void reading sessions and saved position.
              </div>
            </div>
            
            { changeText &&
              <RField 
                containerClass='mb5' 
                fullWidth 
                name='text' 
                label='Text' 
                multiline 
                rows={10} 
                rowsMax={10} 
                variant='outlined' 
                color='primary' 
              />
            }
            
            <RField 
              containerClass='mb5' 
              fullWidth 
              name='description' 
              label='Text description' 
              multiline 
              rows={3} 
              rowsMax={3} 
              variant='outlined' 
              color='primary' 
            />
            <RField 
              containerClass='mb5' 
              fullWidth 
              name='links' 
              label='Text links' 
              multiline 
              rows={3} 
              rowsMax={3} 
              variant='outlined' 
              color='primary' 
            />
            { readingTags && 
              <div className='mb5'>
                Tags:
                {
                  readingTags.map(t => {
                    return <Chip 
                      className='mr5px'
                      size='small'
                      label={ t.name } 
                      key={ t.id }
                      deleteIcon={ <CancelIcon/> }
                      onDelete={() => handleRemoveOldTag(t)}
                    />
                  })
                }
              </div>
            }
            
            { tagsOptions && tagsOptions.length > 0 &&
              <RAutocomplete
                containerClass='mb5'
                multiple
                name='tags'
                options={ tagsOptions.filter(t => !readingTags.some(tag => tag.id === t.id)) }
                freeSolo
                filterSelectedOptions
                getOptionLabel={ t => t.name }
                renderInput={(params) => (
                  <TextField 
                    { ...params } 
                    fullWidth 
                    color='primary' 
                    variant="outlined" 
                    label="Tags" 
                    placeholder="Add tags" 
                  />
                )}
              />
            }
            
            { tagsAdded && tagsAdded.length > 0 &&
              <div>
                <span> New tags will be added to this text and for use in the future. </span>
                <div className='tags-added mb5'>
                  {
                    tagsAdded.map(v => {
                      return <Chip 
                        className='mr5px'
                        label={ v.name } 
                        key={ v.id } 
                        onDelete={() => handleRemoveNewTag(v)}
                        deleteIcon={ <CancelIcon/> }
                      />
                      })
                    }
                  </div>
                </div>
              }
            
            
            <NewTag 
              label='New tags'
              variant='outlined'
              color='primary'
              containerClass='mb5'
              onTagAdd={ handleAddNewTag }
            />
            
            <Button type='submit' variant='outlined' fullWidth> Save </Button>
          </Form>
        )}}
      </Formik>
    </div>
  )
}

// export default ReadingEditForm;
const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  updateReadingOffline: ( updateData, changeText ) => dispatch(updateReadingOfflineStart(updateData, changeText)),
  updateReadingOnline: updateData => dispatch(updateReadingOnlineStart(updateData))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps), 
  WSpinner
)(ReadingEditForm);
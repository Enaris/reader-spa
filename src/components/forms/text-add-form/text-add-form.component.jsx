import React, { useState } from 'react';
import { connect } from 'react-redux';
import './text-add-form.styles.scss';
import { Formik, Form } from 'formik';
import RField from '../../general/formik/RField/RField.component';
import { Button, TextField, Chip, InputAdornment, IconButton, FormControlLabel, Switch } from '@material-ui/core';
import RAutocomplete from '../../general/formik/RAutocomplete/RAutocomplete.component';
import CancelIcon from '@material-ui/icons/Cancel';
import NewTag from '../../general/new-tag/new-tag.component';
import RDropPreview from '../../general/RDropzone/RDropPreview/RDropPreview.component';
import { addReading } from '../../../redux/offline-library/offline-lib.actions';
import { isNullOrWhitespace } from '../../../utils/string-helpers';

const TextAddForm = ({ user, tags, addReading }) => {

  const [ newTag, setNewTag ] = useState("");
  const [ tagsAdded, setTagsAdded ] = useState([]);
  const [ coverImg, setCoverImg ] = useState(null);
  const [ addCover, setAddCover ] = useState(false);

  const handleDropImg = img => {
    setCoverImg(img);
  }
  const handleRemoveImg = () => {
    setCoverImg(null);
  }

  const handleRemoveNewTag = tag => {
    setNewTag("");
    setTagsAdded(tagsAdded.filter(item => tag.id !== item.id)); 
  }
  const handleAddNewTag = addedTag => {
    setNewTag("");
    if (isNullOrWhitespace(addedTag))
      return;
    if ((tags && tags.some(tag => tag.name === addedTag)) || (tagsAdded && tagsAdded.some(tag => tag.name === addedTag))) {
      return;
    }
    setTagsAdded([...tagsAdded, {id: addedTag, name: addedTag}]); 
  }
  const handleSubmit = data => {
    var reading = { ...data };
    reading.tags = [ ...reading.tags, ...tagsAdded ];
    addReading({data: reading, newTags: tagsAdded});
  }

  return (
    <div className='min-vw50 add-text-form'>

      <FormControlLabel 
        value={ addCover }
        onChange={ e => setAddCover(e.target.checked) }
        control={<Switch color='primary' checked={ addCover } />} 
        label='Add cover'
      />

      { addCover &&
        <div className='added-image-container mb5'>
          <div className='added-image'>
            <RDropPreview 
              label='Add cover image'
              onRemove={ handleRemoveImg }
              handleDrop={ handleDropImg }
            />
          </div>
        </div>
      }

      <Formik 
        initialValues={{
          text: '',
          description: '', 
          links: '', 
          tags: [], 
        }}
        onSubmit={v => handleSubmit(v) }
      >
        { props => {
          console.log(props.values); 
          return (
          <Form >
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
            
            { tags && tags.length > 0 &&
              <RAutocomplete
                containerClass='mb5'
                multiple
                name='tags'
                options={tags}
                freeSolo
                filterSelectedOptions
                getOptionLabel={ t => t.name }
                renderInput={(params) => (
                  <TextField {...params} fullWidth color='primary' variant="outlined" label="Tags" placeholder="Tags" />
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
                        label={v.name} 
                        key={v.id} 
                        onDelete={() => handleRemoveNewTag(v)}
                        deleteIcon={<CancelIcon/>}
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
              onTagAdd={handleAddNewTag}
            />
            
            <Button type='submit' variant='outlined' fullWidth> Add </Button>
          </Form>
        )}}
      </Formik>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  addReading: data => dispatch(addReading(data))
})

export default connect(null, mapDispatchToProps)(TextAddForm);
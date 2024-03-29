import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './text-add-form.styles.scss';
import { Formik, Form } from 'formik';
import RField from '../../general/formik/RField/RField.component';
import { Button, TextField, Chip, FormControlLabel, Switch } from '@material-ui/core';
import RAutocomplete from '../../general/formik/RAutocomplete/RAutocomplete.component';
import CancelIcon from '@material-ui/icons/Cancel';
import NewTag from '../../general/new-tag/new-tag.component';
import RDropPreview from '../../general/RDropzone/RDropPreview/RDropPreview.component';
import { addReading } from '../../../redux/offline-library/offline-lib.actions';
import { isNullOrWhitespace, getExtension } from '../../../utils/string-helpers';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/auth/auth.selectors';
import { formToAddRequestData, formToOfflineText } from './text-add-form.utils';
import { addReadingSetErrors, addReadingStart } from '../../../redux/library/library.actions';
import { selectLastReadingIndex } from '../../../redux/offline-library/offline-lib.selectors';
import { useHistory } from 'react-router-dom';
import RDrop from '../../general/RDropzone/RDrop/RDrop.component';
import { getPDFText } from '../../../utils/pdf-to-text';
import { mbToBytes } from '../../../utils/file-size-helpers';
import validationSchema from './text-add-form.validation';
import RLinkField from '../../general/formik/RLinkField/r-link-field.component';
import FormErrors from '../../general/form-errors/form-errors.component';
import { selectAddReadingErrors } from '../../../redux/library/library.selectors';

const TextAddForm = ({ user, 
  tags, 
  addReadingOffline, 
  addReadingOnline, 
  largestIdInReadings,
  addReadingErrors, 
  setAddErrors
 }) => {

  useEffect(() => {
    return () => {
      setAddErrors(null);
    }
  }, [setAddErrors])
  const [ tagsAdded, setTagsAdded ] = useState([]);
  const [ coverImg, setCoverImg ] = useState(null);
  const [ addCover, setAddCover ] = useState(false);
  const [ useTextFile, setUseTextFile ] = useState(false);

  const [ takingTextFromFile, setTakingTextFromFile ] = useState(false);

  const { push, location } = useHistory();

  const handleDropImg = img => {
    setCoverImg(img);
  }
  const handleRemoveImg = () => {
    setCoverImg(null);
  }

  const handleRemoveNewTag = tag => {
    setTagsAdded(tagsAdded.filter(item => tag.id !== item.id)); 
  }
  const handleAddNewTag = addedTag => {
    if (isNullOrWhitespace(addedTag))
      return;
    setTagsAdded([...tagsAdded, {id: addedTag, name: addedTag}]); 
  }
  const handleSubmit = data => {
    if (user) {
      addReadingOnline(formToAddRequestData(data, user.aspUserId, tagsAdded, coverImg));
    }
    else {
      addReadingOffline(formToOfflineText(data, tagsAdded, largestIdInReadings));
      push('/lib');
    }
  }

  return (
    <div className='max-w-1000 add-text-form'>

      <FormErrors
        containerClass='mb5px'
        errors={ addReadingErrors }
      />
      { user &&
        <div>
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
        </div>
      }      

      <Formik 
        initialValues={{
          title: '',
          text: location.state && location.state.newText && location.state.newText.length > 0 ? location.state.newText : '',
          description: '', 
          links: '', 
          tags: [], 
        }}
        validationSchema={ validationSchema }
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
            <FormControlLabel 
              value={ useTextFile }
              onChange={ e => {
                if (useTextFile) {
                  props.setFieldValue('text', '');
                }
                setUseTextFile(e.target.checked)
              }}
              control={<Switch color='primary' checked={ useTextFile } />} 
              label='Text from file .pdf or .txt'
            />
            { useTextFile &&
              <RDrop 
                containerClass='mb5'
                label='Drop or click to select your text file.'
                multiple={ false } 
                maxSize={ mbToBytes(10) }
                acceptTypes={[ '.txt', '.pdf' ]} 
                handleAccepted={ file => {
                  const extension = getExtension(file.name);
                  var fileReader = new FileReader();
                  setTakingTextFromFile(true);
                  fileReader.onloadend = async () => {
                    const text = extension === '.pdf' 
                      ? await getPDFText(fileReader.result)
                      : fileReader.result;
                    props.setFieldValue('text', text);
                    setTakingTextFromFile(false);
                  }
                  if (extension === '.pdf') {
                    fileReader.readAsDataURL(file);
                  }
                  else {
                    fileReader.readAsText(file);
                  }
                }} 
                errorsInside={ true }
              />
            } 
            { useTextFile ?
              <div className='file-txt-container mb5'>
                { takingTextFromFile ? "Loading..." : props.values.text }
              </div>
              :
              <RField 
                containerClass='mb5' 
                fullWidth 
                name='text' 
                label='Text' 
                multiline 
                rows={10} 
                rowsMax={10} 
                inputProps={{ spellCheck: "true" }}
                variant='outlined' 
                color='primary' 
                disabled={ useTextFile }
              />
            }
            
            
            <RField 
              containerClass='mb5' 
              fullWidth 
              name='description' 
              label='Description' 
              multiline 
              rows={3} 
              rowsMax={3} 
              variant='outlined' 
              color='primary' 
            />
            {/* <RField 
              containerClass='mb5' 
              fullWidth 
              name='links' 
              label='Links' 
              multiline 
              rows={3} 
              rowsMax={3} 
              variant='outlined' 
              color='primary' 
            />
             */}
            <RLinkField
              containerClass='mb5'
              name='links' 
              label='Links'
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
              maxLen={ 20 }
              alreadyAdded={[ ...tags, ...tagsAdded ]}
              onTagAdd={ handleAddNewTag }
            />
            
            <Button type='submit' variant='outlined' fullWidth> Add </Button>
          </Form>
        )}}
      </Formik>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  largestIdInReadings: selectLastReadingIndex, 
  addReadingErrors: selectAddReadingErrors
})

const mapDispatchToProps = dispatch => ({
  addReadingOffline: data => dispatch(addReading(data)),
  addReadingOnline: data => dispatch(addReadingStart(data)), 
  setAddErrors: errors => dispatch(addReadingSetErrors(errors))
})

export default connect(mapStateToProps, mapDispatchToProps)(TextAddForm);
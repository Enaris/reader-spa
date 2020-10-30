import React, { useState } from 'react';
import './new-tag.styles.scss';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const NewTag = ({ onTagAdd, containerClass, maxLen, alreadyAdded, ...props }) => {

  const [ newTag, setNewTag ] = useState("");
  const [ message, setMessage ] = useState(null);
  const handleAddTag = tag => {
    if (maxLen && tag.length > maxLen) {
      setMessage('Tag is too long.');
      return;
    }
    if (alreadyAdded && alreadyAdded.some(t => t.name === tag)) {
      setMessage('Tag is already added');
      return;
    }
    setMessage(null);
    onTagAdd(tag);
    setNewTag("");
  }

  return (
    <div className={ containerClass }>
      <TextField 
        { ...props }
        helperText={ message }
        error={ Boolean(message )}
        type='text'
        value={ newTag }
        onChange={ e => setNewTag(e.target.value) }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="add new tag"
                edge="end"
                onClick={() => handleAddTag(newTag)}
              >
                <AddCircleIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </div>
  )
}

export default NewTag;
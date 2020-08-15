import React, { useState } from 'react';
import './new-tag.styles.scss';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const NewTag = ({ onTagAdd, containerClass, ...props }) => {

  const [ newTag, setNewTag ] = useState("");
  const handleAddTag = tag => {
    onTagAdd(tag);
    setNewTag("");
  }

  return (
    <div className={ containerClass }>
      <TextField 
        { ...props }
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
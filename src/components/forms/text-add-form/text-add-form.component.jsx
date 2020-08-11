import React from 'react';
import './text-add-form.styles.scss';
import { Formik, Form } from 'formik';
import RField from '../../general/formik/RField/RField.component';
import { Button, TextField, Chip } from '@material-ui/core';
import RAutocomplete from '../../general/formik/RAutocomplete/RAutocomplete.component';

const TextAddForm = ({ user }) => {

  return (
    <div>
      <Formik 
        initialValues={{
          text: '',
          description: '', 
          links: '', 
          tags: [], 
          coverUrl: ''
        }}
        onSubmit={v => console.log(v) }
      >
        <Form >
          <RField name='text' label='test' multiline rows={10} rowsMax={10} variant='outlined' color='primary' />
          <RField name='description' label='test' multiline rows={3} rowsMax={3} variant='outlined' color='primary' />
          <RField name='links' label='test' multiline rows={3} rowsMax={3} variant='outlined' color='primary' />
          <RAutocomplete
            multiple
            id="tags-filled"
            options={[1, 2, 3, 4]}
            defaultValue={1}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} variant="filled" label="freeSolo" placeholder="Favorites" />
            )}
          />
          <Button type='submit' variant='outlined'> Login </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default TextAddForm;
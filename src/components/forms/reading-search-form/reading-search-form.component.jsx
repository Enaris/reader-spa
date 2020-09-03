import React from 'react';
import { useHistory } from 'react-router-dom';
import './reading-search-form.styles.scss';
import RAutocomplete from '../../general/formik/RAutocomplete/RAutocomplete.component';
import RField from '../../general/formik/RField/RField.component';
import { Formik, Form } from 'formik';
import { TextField, Button } from '@material-ui/core';
import { toQuerryData } from './reading-search-form.utils';
import queryString from 'query-string';

const ReadingSearchForm = ({ tagsOptions }) => {
  
  const { push, location } = useHistory();
  const searchData = queryString.parse(location.search, {arrayFormat: 'bracket'});
  console.log(searchData);
  console.log(tagsOptions);

  return (
    <div className='reading-search-form'>
      <Formik
        initialValues={{
          title: searchData.title ? searchData.title : '', 
          tags: searchData.tags 
            ? tagsOptions.filter(tOpt => searchData.tags.some(tSearch => tSearch === tOpt.id)) 
            : []
        }}
        onSubmit={ v => {
          console.log(v);
          push({
            pathname: location.pathname, 
            search: queryString.stringify(toQuerryData(v), { 
              arrayFormat: 'bracket', 
              skipNull: true, 
              skipEmptyString: true 
            })
          })

        }}
      > 
        <Form>
          <RField 
            name='title'
            label='Title'
          />
          <RAutocomplete
            disabled={ !tagsOptions || tagsOptions.length === 0 }
            multiple
            name='tags'
            options={ tagsOptions ? tagsOptions : [ "No tags" ] }
            freeSolo
            filterSelectedOptions
            getOptionLabel={ t => t.name }
            renderInput={(params) => (
              <TextField {...params} fullWidth color='primary' variant="outlined" label="Tags" placeholder="Tags" />
            )}
          />
          <Button type='submit'>
            Search
          </Button>
        </Form>
      </Formik>
    </div>
  )
}


export default ReadingSearchForm;
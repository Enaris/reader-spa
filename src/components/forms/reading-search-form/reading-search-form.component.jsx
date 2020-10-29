import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './reading-search-form.styles.scss';
import RAutocomplete from '../../general/formik/RAutocomplete/RAutocomplete.component';
import RField from '../../general/formik/RField/RField.component';
import { Formik, Form } from 'formik';
import { TextField, Button } from '@material-ui/core';
import { toQuerryData } from './reading-search-form.utils';
import queryString from 'query-string';
import { selectCurrentUser } from '../../../redux/auth/auth.selectors';
import { createStructuredSelector } from 'reselect';
import WSpinner from '../../general/spinner/w-spinner/w-spinner.component';

const ReadingSearchForm = ({ tagsOptions, isLoading, containerClass }) => {
  
  const { push, location } = useHistory();
  const searchData = queryString.parse(location.search, {arrayFormat: 'bracket'});

  return (
    <div className={ `${containerClass ? containerClass : ''} reading-search-form`}>
      <Formik
        initialValues={{
          title: searchData.title ? searchData.title : '', 
          tags: searchData.tags 
            ? tagsOptions.filter(tOpt => searchData.tags.some(tSearch => tSearch === tOpt.id)) 
            : []
        }}
        onSubmit={ v => {
          push ({
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
          <div className='mb5px'>Search for readings: </div>
          <RField 
            color='primary' 
            variant="outlined"
            name='title'
            label='Title'
            containerClass='mb5px width3rem'
            fullWidth
          />
          <RAutocomplete
            containerClass='mb5px width3rem'
            disabled={ !tagsOptions || tagsOptions.length === 0 }
            multiple
            name='tags'
            options={ tagsOptions ? tagsOptions : [ 'No tags' ] }
            freeSolo
            filterSelectedOptions
            getOptionLabel={ t => t.name }
            renderInput={(params) => (
              <TextField {...params} color='primary' variant="outlined" label="Tags" placeholder="Tags" />
            )}
          />
          <Button 
            type='submit'
            color='primary' 
            variant="outlined"
          >
            Search
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
})

export default compose(
  connect(mapStateToProps), 
  WSpinner
)(ReadingSearchForm);
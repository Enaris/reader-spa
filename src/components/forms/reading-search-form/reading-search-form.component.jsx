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
import { setFilters } from '../../../redux/offline-library/offline-lib.actions';
import { selectCurrentUser } from '../../../redux/auth/auth.selectors';
import { fetchReadingsStart } from '../../../redux/library/library.actions';
import { createStructuredSelector } from 'reselect';
import WSpinner from '../../general/spinner/w-spinner/w-spinner.component';

const ReadingSearchForm = ({ tagsOptions, setFilters, user, fetchReadings, isLoading }) => {
  
  const { push, location } = useHistory();
  const searchData = queryString.parse(location.search, {arrayFormat: 'bracket'});

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
          // setFilters({ title: v.title, tags: v.tags.map(t => t.id) });
          // if (user) {
          //   fetchReadings(user.aspUserId, { title: v.title, tags: v.tags.map(t => t.id) });
          // }
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
          <RField 
            name='title'
            label='Title'
          />
          <RAutocomplete
            disabled={ !tagsOptions || tagsOptions.length === 0 }
            multiple
            name='tags'
            options={ tagsOptions ? tagsOptions : [ 'No tags' ] }
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

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setFilters: filters => dispatch(setFilters(filters)), 
  fetchReadings: (aspUserId, filters) => dispatch(fetchReadingsStart(aspUserId, filters))
});

// export default connect(mapStateToProps, mapDispatchToProps)(ReadingSearchForm);
export default compose(
  connect(mapStateToProps, mapDispatchToProps), 
  WSpinner
)(ReadingSearchForm);
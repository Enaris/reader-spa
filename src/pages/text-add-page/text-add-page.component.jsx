import React from 'react';
import { connect } from 'react-redux';
import './text-add-page.styles.scss';
import TextAddForm from '../../components/forms/text-add-form/text-add-form.component';
import { selectTags } from '../../redux/offline-library/offline-lib.selectors';
import { createStructuredSelector } from 'reselect';

const TextAddPage = ({ user, tags }) => {


  return (
    <div className='flex_wh100 flex-column text-add-page'>
      <TextAddForm 
        tags={ tags }
      />
    </div>
  )

}

const mapStateToProps = createStructuredSelector({
  tags: selectTags
})
export default connect(mapStateToProps)(TextAddPage);
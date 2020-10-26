import React from 'react';
import TagsTableWrapper from '../../components/application/tags-table/tags-table.wrapper';
import './tags-page.syles.scss';

const TagsPage = () => {

  return (
    <div className='page-flex flex-center flex-column p5'>
      <TagsTableWrapper />
    </div>
  )
}

export default TagsPage;

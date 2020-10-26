import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import TagDetailsWrapper from '../../components/application/tag/tag-details/tag-details.wrapper';
import './tag-details-page.styles.scss';

const TagDetailsPage = () => {

  const { params: { tagId }} = useRouteMatch(); 
  return (
    <div className='tag-details-page'>
      <TagDetailsWrapper
         tagId={ tagId }
      />
    </div>
  )
}

export default TagDetailsPage;
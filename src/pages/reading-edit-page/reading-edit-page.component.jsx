import React from 'react';
import './reading-edit-page.styles.scss';
import ReadingEditFormWrapper from '../../components/forms/reading-edit-form/reading-edit-form.wrapper';
import { useRouteMatch } from 'react-router-dom';

const ReadingEditPage = () => {

  const { params: { readingId }} = useRouteMatch(); 
  return (
    <div className='flex_wh100 flex-column reading-edit-page'>
      <ReadingEditFormWrapper 
        readingId={ readingId }
      />
    </div>
  )
}

export default ReadingEditPage;
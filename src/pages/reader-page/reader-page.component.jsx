import React from 'react';
import './reader-page.styles.scss';
import ReaderApp from '../../components/application/reader-app/reader-app.component';
import OptionBar from '../../components/general/option-bar/option-bar.component';
import { ReaderPageStyled } from './reader-page.styled';

const ReaderPage = () => {

  return (
    <ReaderPageStyled>
      <ReaderApp />
      <OptionBar />
    </ReaderPageStyled>
  )
}

export default ReaderPage;
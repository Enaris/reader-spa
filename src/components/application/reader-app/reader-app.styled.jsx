import styled from 'styled-components';

export const ReaderAppStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.wordColor};
`
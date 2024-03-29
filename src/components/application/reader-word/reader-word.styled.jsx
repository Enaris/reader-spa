import styled from 'styled-components';

export const ReaderWordStyled = styled.div`
  font-size: ${props => props.theme.wordSize}px;
  color: ${props => props.theme.wordColor};
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`
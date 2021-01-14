import React from 'react';
import styled from 'styled-components';

const CenterDiv = ({ children }) => {
  return <Div>{children}</Div>;
};

const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export default CenterDiv;

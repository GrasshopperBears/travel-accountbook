import React from 'react';
import styled from 'styled-components';
import CenterDiv from '@components/common/CenterDiv';

const LoginPageLayout = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled(CenterDiv)`
  width: 100vw;
  height: 100vh;
`;

export default LoginPageLayout;

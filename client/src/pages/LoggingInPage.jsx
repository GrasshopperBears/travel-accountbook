import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import CenterDiv from '@components/common/CenterDiv';

const LoggingInPage = () => {
  return (
    <Wrapper>
      <Spin />
      <p style={{ marginLeft: '1rem' }}>로그인 중입니다...</p>
    </Wrapper>
  );
};

const Wrapper = styled(CenterDiv)`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 20px;
`;

export default LoggingInPage;

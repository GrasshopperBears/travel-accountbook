import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import qs from 'qs';
import service from '@services/auth';
import { Spin } from 'antd';
import CenterDiv from '@components/common/CenterDiv';

const LoggingInPage = ({ location }) => {
  const history = useHistory();
  useEffect(() => {
    const { search } = location;
    const { code } = qs.parse(search, { ignoreQueryPrefix: true });
    loginUser(code);
  }, []);

  const loginUser = async (code) => {
    const result = await service.login(code);
    if (result) history.push('/');
    else {
      alert('로그인 중 오류가 발생했습니다.');
      history.push('/login');
    }
  };

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

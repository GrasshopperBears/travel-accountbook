import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import service from '@services/auth';
import LoginPageLayout from '@layouts/LoginPageLayout';
import CenterDiv from '@components/common/CenterDiv';
import { Button } from 'antd';

const LoginPage = () => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('token')) isUserAuthorized();
  }, []);

  const isUserAuthorized = async () => {
    const {
      data: { authorized },
    } = await service.isAuth();
    if (authorized) history.push('/');
  };

  return (
    <LoginPageLayout>
      <Wrapper>
        <Title>Trip 가계부</Title>
        <a href={process.env.REACT_APP_KAKAO_OAUTH_URL} style={{ width: '100%' }}>
          <LoginBtn>카카오로 로그인하기</LoginBtn>
        </a>
      </Wrapper>
    </LoginPageLayout>
  );
};

const Wrapper = styled(CenterDiv)`
  flex-direction: column;
  width: 25rem;
`;
const Title = styled.p`
  font-size: 3rem;
`;
const LoginBtn = styled(Button)`
  width: 100%;
  height: 3.5rem;
  border: 3px solid ${({ theme }) => theme.color.kakaoYellowColor};
  font-size: 1.1rem;
  font-weight: bold;

  &:hover {
    border: 3px solid ${({ theme }) => theme.color.kakaoBrownColor};
    color: ${({ theme }) => theme.color.kakaoBrownColor};
  }
`;

export default LoginPage;

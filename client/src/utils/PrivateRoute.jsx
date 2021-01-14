import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import service from '@services/auth';
import CenterDiv from '@components/common/CenterDiv';
import { Spin } from 'antd';
import styled from 'styled-components';

const PrivateRoute = ({ component, ...rest }) => {
  const [userAuthorized, setUserAuthorized] = useState({ pending: true, authorized: false });

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setUserAuthorized({ pending: false, authorized: false });
      return;
    }
    isUserAuthorized();
  }, []);

  const isUserAuthorized = async () => {
    const {
      data: { authorized },
    } = await service.isAuth();
    setUserAuthorized({ pending: false, authorized });
  };

  return userAuthorized.pending ? (
    <SpinWrapper>
      <Spin size='large' />
    </SpinWrapper>
  ) : userAuthorized.authorized ? (
    <Route {...rest} render={(props) => React.createElement(component, props)} />
  ) : (
    <Route
      {...rest}
      render={({ location }) => (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )}
    />
  );
};

const SpinWrapper = styled(CenterDiv)``;

export default PrivateRoute;

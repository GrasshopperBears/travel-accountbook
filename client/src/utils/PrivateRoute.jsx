import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import CenterDiv from '@Components/common/CenterDiv';
import { Spin } from 'antd';

const PrivateRoute = ({ component, ...rest }) => {
  const [userAuthorized, setUserAuthorized] = useState({ pending: true, authorized: false });

  useEffect(() => {
    console.log(111);
  }, []);

  return userAuthorized.pending ? (
    <CenterDiv>
      <Spin size='large' />
    </CenterDiv>
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

export default PrivateRoute;

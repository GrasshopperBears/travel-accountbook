import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '@layouts/GlobalStyle';
import PrivateRoute from '@utils/PrivateRoute';
import { TotalPage, LoginPage, DailyPage, CategoryPage, MapPage, NotFoundPage, LoggingInPage } from './pages';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path='/' component={TotalPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/auth/kakao/redirect' component={LoggingInPage} />
          <PrivateRoute path='/daily' component={DailyPage} />
          <PrivateRoute path='/category' component={CategoryPage} />
          <PrivateRoute path='/map' component={MapPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

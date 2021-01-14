import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from '@Utils/PrivateRoute';
import { TotalPage, LoginPage, DailyPage, CategoryPage, MapPage, NotFoundPage } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path='/' component={TotalPage} />
        <Route exact path='/login' component={LoginPage} />
        <PrivateRoute path='/daily' component={DailyPage} />
        <PrivateRoute path='/category' component={CategoryPage} />
        <PrivateRoute path='/map' component={MapPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

import React from 'react';
import { Login } from './pages/login';
import { Register } from './pages/register';

import { Switch, Route } from 'react-router-dom';

export const Routes = () => {
    return (
        <Switch>
        <Route path='/login' component={Login} exact />
        <Route path='/register' component={Register} />
      </Switch>
    );
};
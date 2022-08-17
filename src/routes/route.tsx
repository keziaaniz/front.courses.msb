import React from 'react';
import {
  Switch, Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import Index from '../pages/Home/index';
import PageError from '../pages/PageError';
import Admin from '../pages/Adm/Home';
import Unit from '../pages/Adm/Unidades/UnitForm';
import Role from '../pages/Adm/Unidades/RoleForm';

function Routes(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home" component={Index} />
        <Route exact path="/adm" component={Admin} />
        <Route exact path="/adm/unit" component={Unit} />
        <Route exact path="/adm/role" component={Role} />
        <Route path="*" component={PageError} />
      </Switch>
    </Router>
  );
}

export default Routes;

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
import Login from '../pages/Login/login';
import Register from '../pages/Login/register';
import Servers from "../pages/Adm/Servidores/Index";
import UserInt from "../pages/Adm/PerfildeUsuárrio/index";
import Table from "../components/Tables/Servidores/Index";

function Routes(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home" component={Index} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/adm" component={Admin} />
        <Route exact path="/adm/unit" component={Unit} />
        <Route exact path="/adm/role" component={Role} />
        <Route exact path="/adm/colab/server" component={Servers} />
        <Route exact path="/adm/colab/server/table" component={Table} />
        <Route exact path="/adm/colab/users" component={UserInt} />
        <Route path="*" component={PageError} />
      </Switch>
    </Router>
  );
}

export default Routes;

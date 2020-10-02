import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ROUTES } from 'Data/constants';
import Layout from 'Components/Layout';
import Home from 'Containers/Home';
import AboutUs from 'Containers/AboutUs';
import NotFound from 'Containers/NotFound';
import Register from 'Containers/Register';
import RegisterConfirm from 'Containers/Register/ConfirmPage';
import Login from 'Containers/Login';
import RegisterVolunteer from 'Containers/Register/volunteer';

import './index.scss';

const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path={ROUTES.home} component={Home} />
        <Route exact path={ROUTES.about} component={AboutUs} />
        <Route exact path={ROUTES.register} component={Register} />
        <Route exact path={ROUTES.login} component={Login} />
        <Route exact path={ROUTES.registerOk} component={RegisterConfirm} />
        <Route exact path={ROUTES.registerVolunteer} component={RegisterVolunteer} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </Router>
);

export default App;

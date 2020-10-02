import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ROUTES } from 'Data/constants';
import Layout from 'Components/Layout';
import Home from 'Containers/Home';
import AboutUs from 'Containers/AboutUs';
import NotFound from 'Containers/NotFound';
import Register from 'Containers/Register';
import Profile from 'Containers/Profile';
import Login from 'Containers/Login';
import CreateOrder from 'Containers/CreateOrder';

import './index.scss';

const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path={ROUTES.home} component={Home} />
        <Route exact path={ROUTES.about} component={AboutUs} />
        <Route exact path={ROUTES.register} component={Register} />
        <Route exact path={ROUTES.login} component={Login} />
        <Route exact path={ROUTES.createOrder} component={CreateOrder} />
        <Route exact path={ROUTES.profile} component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </Router>
);

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ROUTES } from 'Data/constants';
import Layout from 'Components/Layout';
import Home from 'Containers/Home';
import AboutUs from 'Containers/AboutUs';
import NotFound from 'Containers/NotFound';
import Register from 'Containers/Register';
import RegisterConfirm from 'Containers/Register/ConfirmPage';
import Profile from 'Containers/Profile';
import Login from 'Containers/Login';
import Orders from 'Containers/Orders';
import PublicOnlyRoute from 'Components/Router/PublicOnlyRoute';
import PrivateRoute from 'Components/Router/PrivateRoute';
import VolunteerOnlyRoute from 'Components/Router/VolunteerOnlyRoute';

import './index.scss';

const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path={ROUTES.home} component={Home} />
        <Route exact path={ROUTES.about} component={AboutUs} />
        <PublicOnlyRoute exact path={ROUTES.register} component={Register} />
        <PublicOnlyRoute exact path={ROUTES.login} component={Login} />
        <Route exact path={ROUTES.registerOk} component={RegisterConfirm} /> {/* TODO: Make this inaccessible */}
        <PublicOnlyRoute exact path={ROUTES.registerVolunteer} component={() => <Register volunteer />} />
        <PrivateRoute exact path={ROUTES.profile} component={Profile} />
        <VolunteerOnlyRoute exact path={ROUTES.orders} component={Orders} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </Router>
);

export default App;

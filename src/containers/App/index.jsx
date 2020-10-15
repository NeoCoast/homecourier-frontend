import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ROUTES } from 'Data/constants';
import MainContainer from 'Components/MainContainer';
import Home from 'Containers/Home';
import AboutUs from 'Containers/AboutUs';
import NotFound from 'Containers/NotFound';
import Register from 'Containers/Register';
import Profile from 'Containers/Profile';
import Login from 'Containers/Login';
import Orders from 'Containers/Orders';
import MyOrders from 'Containers/MyOrders';
import PublicOnlyRoute from 'Components/Router/PublicOnlyRoute';
import PrivateRoute from 'Components/Router/PrivateRoute';
import VolunteerOnlyRoute from 'Components/Router/VolunteerOnlyRoute';
import HelpeeOnlyRoute from 'Components/Router/HelpeeOnlyRoute';

import './index.scss';

const App = () => (
  <Router>
    <MainContainer>
      <Switch>
        <Route exact path={ROUTES.home} component={Home} />
        <Route exact path={ROUTES.about} component={AboutUs} />
        <PublicOnlyRoute exact path={ROUTES.register} component={Register} />
        <PublicOnlyRoute exact path={ROUTES.login} component={Login} />
        <PublicOnlyRoute exact path={ROUTES.registerVolunteer} component={() => <Register volunteer />} />
        <PrivateRoute exact path={ROUTES.profile} component={Profile} />
        <VolunteerOnlyRoute exact path={ROUTES.orders} component={Orders} />
        <HelpeeOnlyRoute exact path={ROUTES.myOrders} component={MyOrders} />
        <Route component={NotFound} />
      </Switch>
    </MainContainer>
  </Router>
);

export default App;

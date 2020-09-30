import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ROUTES } from 'Data/constants';
import Layout from 'Components/Layout';
import Home from 'Containers/Home';
import AboutUs from 'Containers/AboutUs';
import NotFound from 'Containers/NotFound';
import Register from 'Containers/Register';
import Perfil from 'Containers/Perfil';
import LoginContainer from 'Containers/Redux/Login';
import PropTypes from 'prop-types';

import './index.scss';

const App = (props) => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path={ROUTES.home} component={Home} />
        <Route exact path={ROUTES.about} component={AboutUs} />
        <Route exact path={ROUTES.register} component={Register} />
        <Route exact path={ROUTES.login} component={LoginContainer} />
        <Route exact path={ROUTES.perfil} component={(routeProps) => <Perfil userInfo={props.data} history={routeProps.history} />} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </Router>
);

App.propTypes = {
  data: PropTypes.object,
};

App.defaultProps = {
  data: undefined,
};

export default App;

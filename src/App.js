import React, { Component } from 'react';
import { Route, Switch, withRouter, Router } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from './config/axios';
import { connect } from 'react-redux';
import { setUser, logoutUser } from './actions/authActions';

import Register from './containers/Register';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import Manage from './containers/Manage';
import Shop from './containers/Shop';
import Achievements from './containers/Achievements';

import theme from './theme';
import store from './store';

import { CssBaseline, MuiThemeProvider } from '@material-ui/core';


class App extends Component {

  constructor(props) {
    super(props);
    if (localStorage.jwtToken) { // set user in store with decoded token data if token exists
      const decodedData = jwtDecode(localStorage.jwtToken);
      if (decodedData.exp < Date.now() / 1000) { // unix in sec, Date obj in ms
        store.dispatch(logoutUser(props.history, true));
      } else {
        store.dispatch(setUser(decodedData));
      }
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const authRoutes = (
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/manage" component={Manage} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/achievements" component={Achievements} />
      </Switch>
    );

    const unauthRoutes = (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    );

    return (
      <Router history={this.props.history}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {isAuthenticated ? authRoutes : unauthRoutes}
        </MuiThemeProvider>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(App));

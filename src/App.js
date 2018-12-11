import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from './config/axios';
import { connect } from 'react-redux';
import { setUser, logoutUser } from './actions/authActions';

import Register from './containers/Register';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import Manage from './containers/Manage';

import theme from './theme';
import store from './store';

import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

if (localStorage.jwtToken) { // set user in store with decoded token data if token exists
  const decodedData = jwtDecode(localStorage.jwtToken);
  store.dispatch(setUser(decodedData));

  if (decodedData.exp < Date.now() / 1000) { // unix in sec, Date obj in ms 
    store.dispatch(logoutUser());
  }
}
class App extends Component {

  render() {
    const { isAuthenticated } = this.props.auth;

    const authRoutes = (
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/manage" component={Manage} />
      </Switch>
    );

    const unauthRoutes = (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    );

    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {isAuthenticated ? authRoutes : unauthRoutes}
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);

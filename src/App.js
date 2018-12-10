import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './containers/Register';

import theme from './theme';

import { CssBaseline, MuiThemeProvider, Typography, Button, AppBar, } from '@material-ui/core';
import CtaButton from './components/CtaButton';
import Logo from './components/Logo/Logo';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="fixed">

        </AppBar>
        <Register />
      </MuiThemeProvider>
    );
  }
}

export default App;

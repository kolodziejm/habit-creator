import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './containers/Register';

import theme from './theme';

import { CssBaseline, MuiThemeProvider, Typography, Button, } from '@material-ui/core';
import CtaButton from './components/CtaButton';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Register />
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;

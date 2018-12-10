import React, { Component } from 'react';

import theme from './theme';

import { CssBaseline, MuiThemeProvider, Typography, Button, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);

import React, { Component } from 'react'

import Logo from '../components/Logo/Logo';

import theme from '../theme';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField } from '@material-ui/core';
import CtaButton from '../components/CtaButton';

const styles = {
  main: {
    margin: '0 10px'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 640,
    margin: '10% auto 0 auto',
    padding: `0 8px 16px 8px`,
    [theme.breakpoints.up('sm')]: {
      padding: `0 32px 24px 32px`
    },
  },
  lastInput: {
    marginBottom: '32px'
  }
};

class Register extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    errors: {}
  }

  inputChangedHandler = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { classes } = this.props;

    return (
      <>
        <main className={classes.main}>
          <Paper className={classes.paper}>
            <Logo width="200" />
            <Typography
              variant="h5"
              align="center"
              className={classes.mainHeader}>Create account</Typography>
            <form
              autoComplete="off"> {/* onSubmitHandler */}
              <TextField
                autoFocus
                margin="normal"
                id="username"
                label="Enter username"
                name="username"
                type="text"
                fullWidth
                onChange={this.inputChangedHandler}
                value={this.state.username}
              />
              <TextField
                margin="normal"
                id="password"
                label="Enter a password"
                name="password"
                type="password"
                fullWidth
                onChange={this.inputChangedHandler}
                value={this.state.password}
              />
              <TextField
                margin="normal"
                id="confirmPassword"
                label="Confirm password"
                name="password"
                type="password"
                fullWidth
                onChange={this.inputChangedHandler}
                value={this.state.confirmPassword}
                className={classes.lastInput}
              />
            </form>
            <CtaButton>Register</CtaButton>
          </Paper>
        </main>
      </>
    )
  }
}

export default withStyles(styles)(Register);
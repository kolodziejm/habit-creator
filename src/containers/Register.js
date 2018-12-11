import React, { Component } from 'react'
import axios from '../config/axios';

import Logo from '../components/Logo/Logo';

import theme from '../theme';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, AppBar } from '@material-ui/core';
import CtaButton from '../components/CtaButton';
import Navbar from '../components/Navbar';

const styles = {
  main: {
    margin: '0 10px'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 640,
    margin: '80px auto 0 auto',
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

  onSubmitHandler = e => {
    e.preventDefault();
    const { username, password, confirmPassword } = this.state;
    const registerData = {
      username, password, confirmPassword
    };
    axios.post('/auth/register', registerData)
      .then()
      .catch(err => {
        console.log(err.response.data.errObj);
        this.setState({ errors: err.response.data.errObj });
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Navbar navValue={1} />
        <main className={classes.main}>
          <Paper className={classes.paper}>
            <Logo width="200" />
            <Typography
              variant="h5"
              align="center"
              className={classes.mainHeader}>Create account</Typography>
            <form
              autoComplete="off"
              onSubmit={this.onSubmitHandler}>
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
                name="confirmPassword"
                type="password"
                fullWidth
                onChange={this.inputChangedHandler}
                value={this.state.confirmPassword}
                className={classes.lastInput}
              />
            </form>
            <CtaButton clicked={this.onSubmitHandler}>Register</CtaButton>
          </Paper>
        </main>
      </>
    )
  }
}

export default withStyles(styles)(Register);
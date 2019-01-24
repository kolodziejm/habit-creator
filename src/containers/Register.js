import React, { Component } from 'react'
import axios from '../config/axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Logo from '../components/Logo/Logo';

import theme from '../theme';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, AppBar, CircularProgress, Hidden } from '@material-ui/core';
import CtaButton from '../components/CtaButton';
import Navbar from '../components/Navbar';
import { setLoginInfo } from '../actions/authActions';

const styles = {
  main: {
    margin: '0 10px'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 640,
    padding: `0 8px 16px 8px`,
    [theme.breakpoints.down('sm')]: {
      margin: '8px auto 0 auto'
    },
    [theme.breakpoints.up('sm')]: {
      margin: '32px auto 0 auto',
      padding: `0 32px 24px 32px`
    },
    [theme.breakpoints.up('md')]: {
      margin: '80px auto 0 auto',
    }
  },
  lastInput: {
    marginBottom: 32
  },
};

class Register extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    errors: {},
    btnLoading: false
  }

  inputChangedHandler = e => this.setState({ [e.target.name]: e.target.value });

  onSubmitHandler = e => {
    e.preventDefault();
    const { username, password, confirmPassword } = this.state;
    const errors = {};
    if (username === '') errors.username = 'Enter a username';
    if (password === '') errors.password = 'Enter a password';
    if (confirmPassword === '') errors.confirmPassword = 'Confirm your password';
    if (Object.entries(errors).length > 0 && errors.constructor === Object) {
      return this.setState({ errors });
    }
    this.setState({ btnLoading: true, errors: {} });
    const registerData = {
      username, password, confirmPassword
    };
    axios.post('/auth/register', registerData)
      .then(res => {
        this.props.setLoginInfo('Account created. You can now login')
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
        this.setState({ errors: err.response.data, btnLoading: false });
      });
  }

  render() {
    const { classes } = this.props;
    const { errors, btnLoading } = this.state;

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
              <input type="submit" style={{ visibility: 'hidden' }} />
              <Hidden only={['md', 'lg', 'xl']}>
                <TextField
                  margin="normal"
                  id="username"
                  label="Username"
                  name="username"
                  type="text"
                  fullWidth
                  onChange={this.inputChangedHandler}
                  value={this.state.username}
                  error={errors.username ? true : false}
                  helperText={errors.username ? errors.username : ''}
                />
              </Hidden>
              <Hidden only={['xs', 'sm']}>
                <TextField
                  margin="normal"
                  autoFocus
                  id="username"
                  label="Username"
                  name="username"
                  type="text"
                  fullWidth
                  onChange={this.inputChangedHandler}
                  value={this.state.username}
                  error={errors.username ? true : false}
                  helperText={errors.username ? errors.username : ''}
                />
              </Hidden>
              <TextField
                margin="normal"
                id="password"
                label="Password"
                name="password"
                type="password"
                fullWidth
                onChange={this.inputChangedHandler}
                value={this.state.password}
                error={errors.password ? true : false}
                helperText={errors.password ? errors.password : ''}
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
                error={errors.confirmPassword ? true : false}
                helperText={errors.confirmPassword ? errors.confirmPassword : ''}
              />
            </form>
            <CtaButton
              clicked={this.onSubmitHandler}>
              {btnLoading ?
                <CircularProgress
                  color="secondary"
                  style={{ width: '19px', height: '19px' }} /> : 'Register'}</CtaButton>
          </Paper>
        </main>
      </>
    )
  }
}

export default connect(null, { setLoginInfo })(withRouter(withStyles(styles)(Register)));
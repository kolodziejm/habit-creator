import React, { Component } from 'react'
import axios from '../config/axios';
import jwtDecode from 'jwt-decode';
import theme from '../theme';

import { setUser, clearExpiredInfo } from '../actions/authActions';
import { connect } from 'react-redux';

import Logo from '../components/Logo/Logo';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, AppBar, CircularProgress, Snackbar } from '@material-ui/core';
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
    marginBottom: 32
  },
  info: {
    backgroundColor: theme.palette.info.backgroundColor,
    color: theme.palette.info.color,
    padding: '8px 16px',
  },
};

class Login extends Component {
  state = {
    username: '',
    password: '',
    errors: {},
    btnLoading: false
  }

  inputChangedHandler = e => this.setState({ [e.target.name]: e.target.value });

  onSubmitHandler = e => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username === '' && password === '') {
      return this.setState({ errors: { username: 'Enter your username', password: 'Enter a password' } });
    }
    if (username === '') {
      return this.setState({ errors: { username: 'Enter your username' } })
    }
    if (password === '') {
      return this.setState({ errors: { password: 'Enter a password' } });
    }
    this.setState({ btnLoading: true });
    const loginData = {
      username, password
    };
    axios.post('/auth/login', loginData)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        const decodedData = jwtDecode(token);
        this.props.setUser(decodedData);
      })
      .catch(err => this.setState({ errors: err.response.data, btnLoading: false }));
  }

  render() {
    const { classes } = this.props;
    const { errors, btnLoading } = this.state;

    return (
      <>
        <Navbar navValue={0} />
        <main className={classes.main}>
          <Paper className={classes.paper}>
            <Logo width="200" />
            <Typography
              variant="h5"
              align="center"
              className={classes.mainHeader}>Login</Typography>
            <form
              autoComplete="off"
              onSubmit={this.onSubmitHandler}>
              <input type="submit" style={{ visibility: 'hidden' }} />
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
              <TextField
                margin="normal"
                id="password"
                label="Password"
                name="password"
                type="password"
                fullWidth
                className={classes.lastInput}
                onChange={this.inputChangedHandler}
                value={this.state.password}
                error={errors.password ? true : false}
                helperText={errors.password ? errors.password : ''}
              />
            </form>
            <CtaButton
              type="submit"
              clicked={this.onSubmitHandler}>
              {btnLoading ?
                <CircularProgress
                  color="secondary"
                  style={{ width: '19px', height: '19px' }} /> : 'Login'}</CtaButton>
          </Paper>
          <Snackbar
            ContentProps={{
              classes: {
                root: classes.info
              }
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={this.props.auth.expiredInfo !== ''}
            autoHideDuration={10000}
            message={this.props.auth.expiredInfo}
            onClose={this.props.clearExpiredInfo}
          />
        </main>
      </>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { setUser, clearExpiredInfo })(withStyles(styles)(Login));
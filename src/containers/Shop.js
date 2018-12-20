import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import axios from '../config/axios';
import { setHabits, finishHabit } from '../actions/habitActions';
import { logoutUser } from '../actions/authActions';

import theme from '../theme';

import Navbar from '../components/Navbar';
import { Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress, Snackbar } from '@material-ui/core';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../animations/fade.css';

const styles = {
  list: {
    listStyleType: 'none',
    margin: '0 auto',
    padding: '0 8px 0 8px',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '900px'
  },
  loadingWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 64
  },
  titleWrapper: {
    margin: '16px 0 8px 0'
  },
  info: {
    backgroundColor: theme.palette.info.backgroundColor,
    color: theme.palette.info.color,
    padding: '8px 16px',
  },
};

class Dashboard extends Component {

  state = {
    errors: {},
    errorSnackbarOpen: false,
    addSnackbarOpen: false,
  }

  componentDidMount() {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    // axios.get('/habits')
    //   .then(res => {
    //     this.props.setHabits(res.data);
    //   })
    //   .catch(err => this.setState({ errors: err }))
  }


  render() {
    const { classes } = this.props;

    return (
      <>
        <Navbar navValue={2} />
        <main>
          <div className={classes.titleWrapper}>
            <Typography variant="h4" align="center">You have: X coins</Typography>
          </div>

        </main>
      </>
    )
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { logoutUser, setHabits, finishHabit })(withRouter(withStyles(styles)(Dashboard)));
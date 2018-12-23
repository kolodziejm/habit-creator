import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import axios from '../config/axios';
import { logoutUser } from '../actions/authActions';

import theme from '../theme';

import Navbar from '../components/Navbar';
import { Typography, CircularProgress } from '@material-ui/core';

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
  progressWrapper: {
    maxWidth: '900px',
    padding: '0 8px 0 8px',
    margin: '0 auto 64px auto'
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
  linkBtnWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  },
  noActiveHabits: {
    marginTop: 32
  }
};

class Achievements extends Component {

  componentDidMount() {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    // axios.get achievements
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Navbar navValue={3} />
        <main>

        </main>
      </>
    )
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { logoutUser })(withRouter(withStyles(styles)(Achievements)));
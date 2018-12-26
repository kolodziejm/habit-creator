import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import axios from '../config/axios';
import { logoutUser } from '../actions/authActions';
import { setAchievements } from '../actions/achievementActions';

import theme from '../theme';
import Achievement from '../components/Achievement';

import Navbar from '../components/Navbar';
import { Typography, CircularProgress, Grid } from '@material-ui/core';

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
  main: {
    margin: '0 auto',
    maxWidth: 916,
    padding: '0 16px'
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
  rewardsGridContainer: {
    margin: '16px 0px 16px 0px'
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

  state = {
    errors: {},
  };

  componentDidMount() {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    axios.get('/achievements')
      .then(res => {
        this.props.setAchievements(res.data);
      })
      .catch(err => this.setState({ errors: err.response }))
  };

  render() {
    const { classes } = this.props;

    const achievementList = this.props.achiev.achievements.map(achievement => (
      <Grid
        key={achievement._id}
        item={true}
        xs={12}
        sm={6}
        md={4}
      >
        <Achievement
          imageName={achievement.imageName}
          title={achievement.title}
          subtitle={achievement.subtitle}
          value={achievement.value}
          isFinished={achievement.usersWhoFinished.includes(this.props.auth.user.userId) ? true : false}
        />
      </Grid>
    )
    );

    return (
      <>
        <Navbar navValue={3} />
        <main className={classes.main}>
          <Grid
            container={true}
            className={classes.rewardsGridContainer}
            spacing={16}
          >
            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={400}
              transitionLeaveTimeout={300}
              component={React.Fragment}
              transitionAppear={true}
              transitionAppearTimeout={200}>
              {achievementList}
            </ReactCSSTransitionGroup>
          </Grid>
          {this.props.achiev.loading ?
            <div className={classes.loadingWrapper}>
              <CircularProgress style={{ width: 60, height: 60 }} />
            </div> : null}
        </main>
      </>
    )
  }
}

const mapStateToProps = state => ({
  achiev: state.achiev,
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, setAchievements })(withRouter(withStyles(styles)(Achievements)));
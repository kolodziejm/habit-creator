import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import axios from '../config/axios';
import { logoutUser } from '../actions/authActions';
import { setAchievements } from '../actions/achievementActions';

import theme from '../theme';

import Navbar from '../components/Navbar';
import { Typography, CircularProgress, Card, CardContent } from '@material-ui/core';

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

  state = {
    errors: {},

  };

  componentDidMount() {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    axios.get('/achievements')
      .then(res => {
        console.log(res.data);
        this.props.setAchievements(res.data);
      })
      .catch(err => this.setState({ errors: err.response.data }))
  };

  render() {
    const { classes } = this.props;

    const achievementList = this.props.achiev.achievements.map(achievement => (
      <Card className={classes.card} key={achievement._id}>
        <img src={require(`../assets/achievementIcons/${achievement.imageName}`)} alt={achievement.imageName} />
        <CardContent>
          {achievement.title} <span>&nbsp;</span>
          {achievement.subtitle} <span>&nbsp;</span>
          {achievement.value}
        </CardContent>
      </Card>
    ));

    return (
      <>
        <Navbar navValue={3} />
        <main>
          {achievementList}
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
  achiev: state.achiev
});

export default connect(mapStateToProps, { logoutUser, setAchievements })(withRouter(withStyles(styles)(Achievements)));
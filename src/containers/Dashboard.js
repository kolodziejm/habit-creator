import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import axios from '../config/axios';
import { setHabits, finishHabit } from '../actions/habitActions';
import { logoutUser } from '../actions/authActions';
import { updateCoins } from '../actions/shopActions';

import theme from '../theme';

import { Line } from 'rc-progress';
import Navbar from '../components/Navbar';
import FinishHabitItem from '../components/FinishHabitItem';
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

class Dashboard extends Component {

  state = {
    infoSnackbarOpen: false,
    infoSnackbarMessage: '',
    finishDialogOpen: false,
    habitId: ''
  };

  componentDidMount() {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    axios.get('/habits')
      .then(res => {
        this.props.setHabits(res.data.habits);
        if (res.data.failAchievValue > 0) {
          this.props.updateCoins(res.data.coins);
        }
      })
      .catch(err => this.setState({ errors: err.response.data }))
  };

  finishHabit = e => {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    const { habitId } = this.state;
    axios.patch(`/habits/finish/${habitId}`)
      .then(res => {
        this.props.finishHabit(habitId);
        this.props.updateCoins(res.data.coins);
        this.closeFinishDialog();
        this.openFinishSnackbar(res.data.value, res.data.bonus);
      })
      .catch(err => {
        this.setState({ errors: err.response.data })
      })
  };

  openFinishDialog = habitId => {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    this.setState({
      finishDialogOpen: true,
      habitId
    })
  };

  closeFinishDialog = () => {
    this.setState({
      finishDialogOpen: false,
      habitId: ''
    })
  };

  openFinishSnackbar = (value, bonus) => {
    const sentenceEnding = bonus > 0 ? ` + ${bonus} coins as a streak bonus!` : '.';
    this.setState({
      infoSnackbarOpen: true,
      infoSnackbarMessage: `Well done! You've earned ${value} coins${sentenceEnding}`
    })
  };

  closeFinishSnackbar = () => this.setState({ infoSnackbarOpen: false })

  render() {
    const { classes } = this.props;

    const habitList = this.props.habits.habits.map((habit, index) => (
      <FinishHabitItem
        key={habit._id}
        name={habit.name}
        color={habit.color}
        isFinished={habit.isFinished}
        clicked={() => this.openFinishDialog(habit._id)} />
    ));

    const finishedHabits = this.props.habits.habits.filter(habit => habit.isFinished).length;
    const completedPercent = ((finishedHabits / this.props.habits.habits.length) * 100).toFixed(0);

    return (
      <>
        <Navbar navValue={0} />
        <main>
          {this.props.habits.habits.length > 0 ?
            <>
              <header className={classes.titleWrapper}>
                <Typography variant="h4" align="center">Today's progress</Typography>
                <Typography variant="h5" align="center">
                  {completedPercent !== 'NaN' ? <span>{completedPercent}%</span> : <span>&nbsp;</span>}
                </Typography>
              </header>
              <div className={classes.progressWrapper}>
                <Line
                  percent={completedPercent !== 'NaN' ? completedPercent : 0}
                  strokeWidth="2"
                  trailWidth="2"
                  strokeColor={theme.palette.secondary.main} />
              </div>
            </> : null}
          {this.props.habits.loading ?
            <div className={classes.loadingWrapper}>
              <CircularProgress style={{ width: 60, height: 60 }} />
            </div> : habitList.length === 0 ?
              <div className={classes.noActiveHabits}>
                <Typography variant="h5" align="center">You currently don't have any active habits</Typography>
                <div className={classes.linkBtnWrapper}>
                  <Button
                    component={Link} to="/manage"
                    color="secondary"
                    variant="contained"
                    size="medium"
                  >
                    Add some here!
              </Button>
                </div>
              </div> : null}
          <ul className={classes.list}>
            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={400}
              transitionLeaveTimeout={300}
              component={React.Fragment}
              transitionAppear={true}
              transitionAppearTimeout={200}
            >
              {habitList}
            </ReactCSSTransitionGroup>
          </ul>
          <Dialog
            open={this.state.finishDialogOpen}
            onClose={this.closeFinishDialog}
          >
            <DialogTitle>Reminder</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Did you really finish that habit? Remember - cheating won't get you anywhere!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                variant="contained"
                size="medium"
                onClick={this.finishHabit}
              >
                Finish
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            ContentProps={{
              classes: {
                root: classes.info
              }
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={this.state.infoSnackbarOpen}
            autoHideDuration={5000}
            onClose={this.closeFinishSnackbar}
            message={this.state.infoSnackbarMessage}
          />
        </main>
      </>
    )
  }
}

const mapStateToProps = state => ({
  habits: state.habit
});

export default connect(mapStateToProps, { logoutUser, setHabits, finishHabit, updateCoins })(withRouter(withStyles(styles)(Dashboard)));
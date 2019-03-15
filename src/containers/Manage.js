import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../config/axios';
import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Button, Dialog, DialogContent, DialogContentText, TextField, DialogActions, DialogTitle, Snackbar, Typography, CircularProgress, Radio, RadioGroup, FormControlLabel, Hidden } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { CirclePicker } from 'react-color';
import theme from '../theme';

import { setHabits, addHabit, deleteHabit, editHabit } from '../actions/habitActions';
import { logoutUser } from '../actions/authActions';
import { updateCoins } from '../actions/shopActions';

import Navbar from '../components/Navbar';
import EditHabitItem from '../components/EditHabitItem';

import jwtDecode from 'jwt-decode';

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
  addBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '32px 0 32px 0'
  },
  addDialogGroup: {
    marginTop: 12,
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'row',
    }
  },
  addDialogRadio: {
    [theme.breakpoints.up('sm')]: {
      '&:not(:last-child)': {
        marginRight: 48
      }
    }
  },
  addSnackbar: {
    backgroundColor: theme.palette.info.backgroundColor,
    color: theme.palette.info.color,
    padding: '8px 16px',
  },
  errorSnackbar: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    padding: '8px 16px',
  },
  danger: {
    backgroundColor: theme.palette.danger.backgroundColor,
    color: theme.palette.danger.color,
    padding: '8px 16px',
  },
  colorPicker: {
    marginTop: 12
  }
};

class Manage extends Component {

  state = {
    errors: {},
    errorSnackbarOpen: false,
    isMenuOpen: false,
    anchorEl: null,
    habitId: '',
    editHabitName: '',
    editHabitDiff: '',
    editHabitColor: '',
    name: '',
    difficulty: 'medium',
    color: '#e91e63',
    addDialogOpen: false,
    addSnackbarOpen: false,
    editDialogOpen: false,
    editSnackbarOpen: false,
    deleteDialogOpen: false,
    deleteSnackbarOpen: false,
  }

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
      .catch(err => {
        console.log(err);
        this.setState({ errors: err })
      })
  }

  inputChangedHandler = e => this.setState({ [e.target.name]: e.target.value });

  addDialogRadioHandler = e => this.setState({ difficulty: e.target.value });

  editDialogRadioHandler = e => this.setState({ editHabitDiff: e.target.value });

  addDialogColorHandler = color => this.setState({ color: color.hex });

  editDialogColorHandler = color => this.setState({ editHabitColor: color.hex });

  openMenu = (e, habitId, editHabitName, editHabitColor, editHabitDiff) => {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    this.setState({
      isMenuOpen: true,
      anchorEl: e.currentTarget,
      habitId,
      editHabitName,
      editHabitColor,
      editHabitDiff
    })
  }

  closeMenu = e => {
    this.setState({
      isMenuOpen: false,
      anchorEl: null,
      habitId: '',
    });
  }

  openAddDialog = e => {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    if (this.props.habits.habits.length >= 10) return this.openErrorSnackbar();
    this.setState({
      addDialogOpen: true,
      name: '',
      difficulty: 'medium',
      color: '#e91e63',
      errors: {}
    })
  }

  closeAddDialog = e => this.setState({ addDialogOpen: false })

  openEditDialog = e => {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    this.setState({
      editDialogOpen: true,
      isMenuOpen: false,
      anchorEl: null,
      errors: {}
    })
  }

  closeEditDialog = e => {
    this.setState({ editDialogOpen: false })
    this.closeMenu(e);
  }

  openDeleteDialog = e => {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    this.setState({
      deleteDialogOpen: true,
      isMenuOpen: false,
      anchorEl: null,
    })
  }

  closeDeleteDialog = e => {
    this.setState({ deleteDialogOpen: false })
    this.closeMenu(e);
  }

  openAddSnackbar = () => this.setState({ addSnackbarOpen: true });

  closeAddAndEditSnackbar = () => this.setState({ addSnackbarOpen: false, editSnackbarOpen: false });

  openErrorSnackbar = () => this.setState({ errorSnackbarOpen: true });

  closeErrorSnackbar = () => this.setState({ errorSnackbarOpen: false });

  openEditSnackbar = () => this.setState({ editSnackbarOpen: true });

  openDeleteSnackbar = () => this.setState({ deleteSnackbarOpen: true });

  closeDeleteSnackbar = () => this.setState({ deleteSnackbarOpen: false });

  addNewHabit = e => {
    e.preventDefault();
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    const { name, color, difficulty } = this.state;
    const habitData = { name, color, difficulty };
    axios.post('/habits', habitData)
      .then(res => {
        this.props.addHabit(res.data);
        this.closeAddDialog();
        this.openAddSnackbar();
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }

  editHabit = e => {
    e.preventDefault();
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    const { editHabitName, habitId, editHabitColor, editHabitDiff } = this.state;
    const habitData = { editHabitName, editHabitColor, editHabitDiff };
    axios.patch(`/habits/${habitId}`, habitData)
      .then(res => {
        this.props.editHabit(habitId, editHabitName, editHabitColor, editHabitDiff);
        this.closeEditDialog();
        this.openEditSnackbar();
      })
      .catch(err => this.setState({ errors: err.response.data }))
  }

  deleteHabit = e => {
    e.preventDefault();
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    const { habitId } = this.state;
    axios.delete(`/habits/${habitId}`)
      .then(res => {
        this.props.deleteHabit(habitId);
        this.closeDeleteDialog();
        this.openDeleteSnackbar();
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { classes } = this.props;
    const { errors } = this.state;

    const habitList = this.props.habits.habits.map((habit, index) => (
      <EditHabitItem
        key={habit._id}
        color={habit.color}
        difficulty={habit.difficulty}
        name={habit.name}
        streak={habit.streak}
        clicked={(e) => this.openMenu(e, habit._id, habit.name, habit.color, habit.difficulty)} />
    ));

    return (
      <>
        <Navbar navValue={1} />
        <main className={classes.main}>
          <div className={classes.addBtnContainer}>
            <Button
              color="secondary"
              variant="contained"
              disableFocusRipple
              size="medium"
              onClick={this.openAddDialog}
            >
              <Add /> Add habit</Button>
          </div>
          <Dialog
            open={this.state.addDialogOpen}
            onClose={this.closeAddDialog}
          >
            <DialogTitle>Habit creation</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter a habit name below. Make sure that it's specific, it'll help you stay consistent!
              </DialogContentText>
              <form onSubmit={this.addNewHabit}>
                <input type="submit" style={{ visibility: 'hidden' }} />
                <Hidden only={['md', 'lg', 'xl']}>
                  <TextField
                    onChange={this.inputChangedHandler}
                    value={this.state.name}
                    type="text"
                    label="Habit name"
                    name="name"
                    fullWidth
                    error={errors.name ? true : false}
                    helperText={errors.name ? errors.name : null}
                  />
                </Hidden>
                <Hidden only={['xs', 'sm']}>
                  <TextField
                    onChange={this.inputChangedHandler}
                    value={this.state.name}
                    type="text"
                    autoFocus
                    label="Habit name"
                    name="name"
                    fullWidth
                    error={errors.name ? true : false}
                    helperText={errors.name ? errors.name : null}
                  />
                </Hidden>
                <RadioGroup
                  aria-label="difficulty"
                  name="difficulty"
                  className={classes.addDialogGroup}
                  value={this.state.difficulty}
                  onChange={this.addDialogRadioHandler}
                >
                  <FormControlLabel
                    value="easy"
                    control={<Radio color="secondary" />}
                    label="Easy"
                    labelPlacement="end"
                    className={classes.addDialogRadio}
                  />
                  <FormControlLabel
                    value="medium"
                    control={<Radio color="secondary" />}
                    label="Medium"
                    labelPlacement="end"
                    className={classes.addDialogRadio}
                  />
                  <FormControlLabel
                    value="hard"
                    control={<Radio color="secondary" />}
                    label="Hard"
                    labelPlacement="end"
                    className={classes.addDialogRadio}
                  />
                </RadioGroup>
                <CirclePicker
                  className={classes.colorPicker}
                  circleSize={18}
                  circleSpacing={12}
                  width={"100%"}
                  color={this.state.color}
                  colors={['#e91e63', '#673ab7', '#2196f3', '#009688', '#8bc34a', '#ff9800']}
                  onChangeComplete={this.addDialogColorHandler}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                variant="contained"
                size="medium"
                onClick={this.addNewHabit}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
          <ul className={classes.list}>
            {this.props.habits.loading ?
              <div className={classes.loadingWrapper}>
                <CircularProgress style={{ width: 60, height: 60 }} />
              </div> : null}
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
            <Menu
              open={this.state.isMenuOpen}
              anchorEl={this.state.anchorEl}
              onBackdropClick={this.closeMenu}
            >
              <MenuItem onClick={this.openEditDialog}>Edit</MenuItem>
              <MenuItem onClick={this.openDeleteDialog}>Delete</MenuItem>
            </Menu>
          </ul>
          <Dialog
            open={this.state.editDialogOpen}
            onClose={this.closeEditDialog}
          >
            <DialogTitle>Edit habit</DialogTitle>
            <DialogContent>
              <form onSubmit={this.editHabit}>
                <input type="submit" style={{ visibility: 'hidden' }} />
                <Hidden only={['md', 'lg', 'xl']}>
                  <TextField
                    onChange={this.inputChangedHandler}
                    value={this.state.editHabitName}
                    type="text"
                    label="Habit name"
                    name="editHabitName"
                    fullWidth
                    error={errors.editHabitName ? true : false}
                    helperText={errors.editHabitName ? errors.editHabitName : null}
                  />
                </Hidden>
                <Hidden only={['xs', 'sm']}>
                  <TextField
                    onChange={this.inputChangedHandler}
                    value={this.state.editHabitName}
                    type="text"
                    autoFocus
                    label="Habit name"
                    name="editHabitName"
                    fullWidth
                    error={errors.editHabitName ? true : false}
                    helperText={errors.editHabitName ? errors.editHabitName : null}
                  />
                </Hidden>
                <RadioGroup
                  aria-label="difficulty"
                  name="difficulty"
                  className={classes.addDialogGroup}
                  value={this.state.editHabitDiff}
                  onChange={this.editDialogRadioHandler}
                >
                  <FormControlLabel
                    value="easy"
                    control={<Radio color="secondary" />}
                    label="Easy"
                    labelPlacement="end"
                    className={classes.addDialogRadio}
                  />
                  <FormControlLabel
                    value="medium"
                    control={<Radio color="secondary" />}
                    label="Medium"
                    labelPlacement="end"
                    className={classes.addDialogRadio}
                  />
                  <FormControlLabel
                    value="hard"
                    control={<Radio color="secondary" />}
                    label="Hard"
                    labelPlacement="end"
                    className={classes.addDialogRadio}
                  />
                </RadioGroup>
                <CirclePicker
                  className={classes.colorPicker}
                  circleSize={18}
                  circleSpacing={12}
                  width={"100%"}
                  color={this.state.editHabitColor}
                  colors={['#e91e63', '#673ab7', '#2196f3', '#009688', '#8bc34a', '#ff9800']}
                  onChangeComplete={this.editDialogColorHandler}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                variant="contained"
                size="medium"
                onClick={this.editHabit}
              >
                Edit
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={this.state.deleteDialogOpen}
            onClose={this.closeDeleteDialog}
          >
            <DialogTitle>{this.state.editHabitName ? this.state.editHabitName : <span>&nbsp;</span>}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this habit? You will lose any existing streak!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                className={classes.danger}
                variant="contained"
                size="medium"
                onClick={this.deleteHabit}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            ContentProps={{
              classes: {
                root: classes.errorSnackbar
              }
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={this.state.errorSnackbarOpen}
            autoHideDuration={5000}
            onClose={this.closeErrorSnackbar}
            message="Maximum of 10 habits are allowed."
          />
          <Snackbar
            ContentProps={{
              classes: {
                root: classes.addSnackbar
              }
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={this.state.addSnackbarOpen || this.state.editSnackbarOpen}
            autoHideDuration={5000}
            onClose={this.closeAddAndEditSnackbar}
            message={this.state.addSnackbarOpen ? "Habit successfully added." : this.state.editSnackbarOpen ? "Habit successfully edited." : null}
          />
          <Snackbar
            ContentProps={{
              classes: {
                root: classes.danger
              }
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={this.state.deleteSnackbarOpen}
            autoHideDuration={5000}
            onClose={this.closeDeleteSnackbar}
            message="Habit successfully deleted."
          />
        </main>
      </>
    )
  }
}

const mapStateToProps = state => ({
  habits: state.habit
});

export default connect(mapStateToProps, { setHabits, logoutUser, addHabit, deleteHabit, editHabit, updateCoins })(withRouter(withStyles(styles)(Manage)));
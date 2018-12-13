import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../config/axios';
import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Button, Dialog, DialogContent, DialogContentText, TextField, DialogActions, DialogTitle, Snackbar, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import theme from '../theme';

import { setHabits } from '../actions/habitActions';
import { logoutUser } from '../actions/authActions';

import Navbar from '../components/Navbar';
import HabitItem from '../components/HabitItem';

import jwtDecode from 'jwt-decode';

const styles = {
  list: {
    listStyleType: 'none',
    margin: '0 auto',
    padding: '0 8px 0 8px',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '900px'
  },
  addBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '32px 0 32px 0'
  },
  addSnackbar: {
    backgroundColor: theme.palette.info.backgroundColor,
    color: theme.palette.info.color
  },
  errorSnackbar: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText
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
    name: '',
    addDialogOpen: false,
    addSnackbarOpen: false,
    editDialogOpen: false,
    editSnackbarOpen: false,
    deleteDialogOpen: false,
  }

  componentDidMount() {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) {
      this.props.logoutUser();
    }
    axios.get('/habits')
      .then(res => this.props.setHabits(res.data))
      .catch(err => this.setState({ errors: err }))
  }

  inputChangedHandler = e => this.setState({ [e.target.name]: e.target.value });

  openMenuHandler = (e, habitId, editHabitName) => {
    this.setState({
      isMenuOpen: true,
      anchorEl: e.currentTarget,
      habitId,
      editHabitName
    })
  }

  closeMenuHandler = e => {
    this.setState({
      isMenuOpen: false,
      anchorEl: null,
      habitId: '',
      editHabitName: ''
    });
  }

  openAddDialogHandler = e => {
    if (this.props.habits.habits.length >= 10) return this.openErrorSnackbar();
    this.setState({
      addDialogOpen: true,
      name: '',
      errors: {}
    })
  }

  closeAddDialogHandler = e => {
    this.setState({
      addDialogOpen: false
    })
  }

  openEditDialogHandler = e => {
    this.setState({ editDialogOpen: true })
  }

  closeEditDialogHandler = e => {
    this.setState({ editDialogOpen: false })
    this.closeMenuHandler(e);
  }

  openDeleteDialogHandler = e => {
    this.setState({ deleteDialogOpen: true })
  }

  closeDeleteDialogHandler = e => {
    this.setState({ deleteDialogOpen: false })
    this.closeMenuHandler(e);
  }

  openAddSnackbar = () => this.setState({ addSnackbarOpen: true });

  closeAddAndEditSnackbar = () => this.setState({ addSnackbarOpen: false, editSnackbarOpen: false });

  openErrorSnackbar = () => this.setState({ errorSnackbarOpen: true });

  closeErrorSnackbar = () => this.setState({ errorSnackbarOpen: false });

  openEditSnackbar = () => this.setState({ editSnackbarOpen: true });

  addNewHabit = e => {
    e.preventDefault();
    const { name } = this.state;
    const habitData = { name };
    axios.post('/habits', habitData)
      .then(res => {
        axios.get('/habits')
          .then(res => {
            this.props.setHabits(res.data)
            this.closeAddDialogHandler();
            this.openAddSnackbar();
          })
          .catch(err => this.setState({ errors: err.response.data.errObj }))
      })
      .catch(err => this.setState({ errors: err.response.data.errObj }));
  }

  editHabit = e => {
    e.preventDefault();
    const { editHabitName, habitId } = this.state;
    const habitData = { editHabitName };
    axios.patch(`/habits/${habitId}`, habitData)
      .then(res => {
        axios.get('/habits')
          .then(res => {
            this.props.setHabits(res.data)
            this.closeEditDialogHandler();
            this.openEditSnackbar();
          })
          .catch(err => this.setState({ errors: err.response.data.errObj }))
      })
      .catch(err => this.setState({ errors: err.response.data.errObj }))
  }

  render() {
    const { classes } = this.props;
    const { errors } = this.state;

    const habitList = this.props.habits.habits.map((habit, index) => (
      <HabitItem
        key={habit._id}
        name={habit.name}
        streak={habit.streak}
        clicked={(e) => this.openMenuHandler(e, habit._id, habit.name)} />
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
              onClick={this.openAddDialogHandler}
            >
              <Add /> Add habit</Button>
          </div>
          <Dialog
            open={this.state.addDialogOpen}
            onClose={this.closeAddDialogHandler}
          >
            <DialogTitle>Habit creation</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter a habit name below. Make sure that it's specific, it'll help you stay consistent!
              </DialogContentText>
              <form onSubmit={this.addNewHabit}>
                <input type="submit" style={{ visibility: 'hidden' }} />
                <TextField
                  onChange={this.inputChangedHandler}
                  value={this.state.name}
                  autoFocus
                  type="text"
                  label="Habit name"
                  name="name"
                  fullWidth
                  error={errors.name ? true : false}
                  helperText={errors.name ? errors.name : null}
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
            {habitList}
            <Menu
              open={this.state.isMenuOpen}
              anchorEl={this.state.anchorEl}
              onBackdropClick={this.closeMenuHandler}
            >
              <MenuItem onClick={this.openEditDialogHandler}>Edit</MenuItem>
              <MenuItem>Delete</MenuItem>
            </Menu>
          </ul>
          <Dialog
            open={this.state.editDialogOpen}
            onClose={this.closeEditDialogHandler}
          >
            <DialogTitle>Edit habit</DialogTitle>
            <DialogContent>
              <form onSubmit={this.editHabit}>
                <input type="submit" style={{ visibility: 'hidden' }} />
                <TextField
                  onChange={this.inputChangedHandler}
                  value={this.state.editHabitName}
                  autoFocus
                  type="text"
                  label="Habit name"
                  name="editHabitName"
                  fullWidth
                  error={errors.editHabitName ? true : false}
                  helperText={errors.editHabitName ? errors.editHabitName : null}
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
            message="Maximum of 10 habits are allowed"
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
            message={this.state.addDialogOpen ? "Habit successfully added!" : "Habit successfully edited!"}
          />
        </main>
      </>
    )
  }
}

const mapStateToProps = state => ({
  habits: state.habit
});

export default connect(mapStateToProps, { setHabits, logoutUser })(withRouter(withStyles(styles)(Manage)));
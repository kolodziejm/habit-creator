import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../config/axios';
import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem } from '@material-ui/core';

import { setHabits } from '../actions/habitActions';

import Navbar from '../components/Navbar';
import HabitItem from '../components/HabitItem';

const styles = {
  list: {
    listStyleType: 'none',
    margin: '0 auto',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '900px'
  }
};

class Manage extends Component {

  state = {
    errors: {},
    isMenuOpen: false,
    anchorEl: null,
    habitId: ''
  }

  componentDidMount() {
    axios.get('/habits')
      .then(res => {
        this.props.setHabits(res.data);
      })
      .catch(err => {
        this.setState({ errors: err });
      })
  }

  openMenuHandler = (e, habitId) => {
    e.preventDefault();
    console.log('it works')
    this.setState({
      isMenuOpen: true,
      anchorEl: e.currentTarget,
      habitId
    })
  }

  closeMenuHandler = e => {
    e.preventDefault();
    this.setState({
      isMenuOpen: false,
      anchorEl: null,
      habitId: ''
    });
  }

  render() {
    const { classes } = this.props;

    const habitList = this.props.habits.habits.map((habit, index) => (
      <HabitItem key={habit._id} name={habit.name} streak={habit.streak} clicked={(e) => this.openMenuHandler(e, habit._id)} />
    ));

    return (
      <>
        <Navbar navValue={1} />
        <main>
          <ul className={classes.list}>
            {habitList}
            <Menu
              open={this.state.isMenuOpen}
              anchorEl={this.state.anchorEl}
              onBackdropClick={this.closeMenuHandler}
            >
              <MenuItem>Edit</MenuItem>
              <MenuItem>Delete</MenuItem>
            </Menu>
          </ul>
        </main>
      </>
    )
  }
}

const mapStateToProps = state => ({
  habits: state.habit
});

export default connect(mapStateToProps, { setHabits })(withRouter(withStyles(styles)(Manage)));
import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import axios from '../config/axios';
import { Add } from '@material-ui/icons';
import { setShop, addReward } from '../actions/shopActions';
import { logoutUser } from '../actions/authActions';

import theme from '../theme';

import Navbar from '../components/Navbar';
import { Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress, Snackbar, TextField } from '@material-ui/core';

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
    margin: '32px 0 8px 0'
  },
  info: {
    backgroundColor: theme.palette.info.backgroundColor,
    color: theme.palette.info.color,
    padding: '8px 16px',
  },
  addBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 16
  },
};

class Shop extends Component {

  state = {
    title: '',
    price: '',
    description: '',
    imageUrl: '',
    errors: {},
    errorSnackbarOpen: false,
    addDialogOpen: false,
    addSnackbarOpen: false,
  }

  componentDidMount() {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    axios.get('/shop')
      .then(res => {
        const { rewards, coins } = res.data;
        this.props.setShop(rewards, coins);
      })
      .catch(err => this.setState({ errors: err }))
  }

  addNewReward = e => {
    e.preventDefault();
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    const { title, price, description, imageUrl } = this.state;
    const rewardData = { title, price }
    if (description !== '') rewardData.description = description;
    if (imageUrl !== '') rewardData.imageUrl = imageUrl;
    axios.post('/shop/add-reward', rewardData)
      .then(res => {
        this.props.addReward(res.data);
        this.closeAddDialog();
        // this.openAddSnackbar();
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }

  inputChangedHandler = e => this.setState({ [e.target.name]: e.target.value });

  openAddDialog = e => {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    if (this.props.shop.rewards.length >= 20) return this.openErrorSnackbar();
    this.setState({
      addDialogOpen: true,
      title: '',
      price: '',
      description: '',
      imageUrl: '',
      errors: {}
    })
  }

  closeAddDialog = e => this.setState({ addDialogOpen: false })


  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    const { rewards, coins } = this.props.shop;

    return (
      <>
        <Navbar navValue={2} />
        <main>
          <header className={classes.titleWrapper}>
            <Typography variant="h5" align="center">You have: {coins} coins</Typography>
          </header>
          <div className={classes.addBtnContainer}>
            <Button
              color="secondary"
              variant="contained"
              disableFocusRipple
              size="small"
              onClick={this.openAddDialog}
            >
              <Add /> Create reward</Button>
          </div>
          <Dialog
            open={this.state.addDialogOpen}
            onClose={this.closeAddDialog}
          >
            <DialogTitle>Reward Creation</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Create a reward system to keep yourself motivated!
                <br />
                Fields marked with * are required.
            </DialogContentText>
              <form onSubmit={this.addNewReward}>
                <input type="submit" style={{ visibility: 'hidden' }} />
                <TextField
                  onChange={this.inputChangedHandler}
                  value={this.state.title}
                  autoFocus
                  type="text"
                  label="Reward title*"
                  name="title"
                  margin="dense"
                  fullWidth
                  error={errors.title ? true : false}
                  helperText={errors.title ? errors.title : null}
                />
                <TextField
                  onChange={this.inputChangedHandler}
                  value={this.state.price}
                  type="number"
                  label="Reward price*"
                  name="price"
                  margin="dense"
                  fullWidth
                  error={errors.price ? true : false}
                  helperText={errors.price ? errors.price : null}
                  inputProps={{ min: 1, max: 1000000 }}
                />
                <TextField
                  onChange={this.inputChangedHandler}
                  value={this.state.description}
                  type="text"
                  label="Reward description"
                  name="description"
                  margin="dense"
                  fullWidth
                  error={errors.description ? true : false}
                  helperText={errors.description ? errors.description : null}
                />
                <TextField
                  onChange={this.inputChangedHandler}
                  value={this.state.imageUrl}
                  type="url"
                  label="Reward image URL"
                  name="imageUrl"
                  margin="dense"
                  fullWidth
                  error={errors.imageUrl ? true : false}
                  helperText={errors.imageUrl ? errors.imageUrl : null}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.addNewReward} color="secondary" variant="contained">
                Create
            </Button>
            </DialogActions>
          </Dialog>
        </main>
      </>
    )
  }
}

const mapStateToProps = state => ({
  shop: state.shop
});

export default connect(mapStateToProps, { logoutUser, setShop, addReward })(withRouter(withStyles(styles)(Shop)));
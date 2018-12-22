import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import axios from '../config/axios';
import { Add } from '@material-ui/icons';
import { setShop, addReward, editReward, deleteReward, updateCoins } from '../actions/shopActions';
import { logoutUser } from '../actions/authActions';

import theme from '../theme';

import Reward from '../components/Reward';

import Navbar from '../components/Navbar';
import { Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress, Snackbar, TextField, Grid } from '@material-ui/core';

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
  danger: {
    backgroundColor: theme.palette.danger.backgroundColor,
    color: theme.palette.danger.color,
    padding: '8px 16px',
  },
  addBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 16
  },
  rewardsGridContainer: {
    marginTop: 32,
    marginRight: 0,
    padding: 0,
  },
  rewardsGridItem: {

  },
  main: {
    margin: '0 auto',
    maxWidth: 1136,
    padding: '0 16px'
  },
};

class Shop extends Component {

  state = {
    title: '',
    price: '',
    description: '',
    imageUrl: '',
    id: '',
    editTitle: '',
    editPrice: '',
    editDescription: '',
    editImageUrl: '',
    buyTitle: '',
    buyPrice: '',
    errors: {},
    errorSnackbarOpen: false,
    addDialogOpen: false,
    addSnackbarOpen: false,
    editDialogOpen: false,
    editSnackbarOpen: false,
    buyDialogOpen: false,
    buySnackbarOpen: false
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

  editReward = () => {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    const { editTitle, editPrice, editDescription, editImageUrl } = this.state;
    const rewardData = { editTitle, editPrice }
    if (editDescription !== '') rewardData.editDescription = editDescription;
    if (editImageUrl !== '') rewardData.editImageUrl = editImageUrl;
    axios.patch(`/shop/edit/${this.state.id}`, rewardData)
      .then(res => {
        this.props.editReward(this.state.id, editTitle, editPrice, editDescription, editImageUrl);
        this.closeEditDialog();
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }

  deleteReward = () => {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    axios.delete(`/shop/delete/${this.state.id}`)
      .then(res => {
        this.props.deleteReward(this.state.id);
        this.closeEditDialog();
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }

  buyReward = () => {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    axios.patch(`/shop/buy/${this.state.id}`)
      .then(res => {
        // Successfully purchased snackbar
        this.props.updateCoins(this.props.shop.coins - this.state.buyPrice);
        this.closeBuyDialog();
      })
      .catch(err => this.setState({ errors: err.response.data }));
  };

  inputChangedHandler = e => this.setState({ [e.target.name]: e.target.value });

  openAddDialog = e => {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    if (this.props.shop.rewards.length >= 20) return this.openErrorSnackbar();
    this.setState({
      addDialogOpen: true,
      id: '',
      title: '',
      price: '',
      description: '',
      imageUrl: '',
      errors: {}
    })
  }

  openEditDialog = (id, title, price, description, imageUrl) => {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    this.setState({
      id,
      editTitle: title,
      editPrice: price,
      editDescription: description ? description : '',
      editImageUrl: imageUrl ? imageUrl : '',
      editDialogOpen: true,
      errors: {},
    })
  };

  openBuyDialog = (id, title, price) => {
    const token = jwtDecode(localStorage.jwtToken);
    if (token.exp < Date.now() / 1000) return this.props.logoutUser(this.props.history, true);
    if (price > this.props.shop.coins) {
      return this.setState({
        // error snackbar - you don't have enough coins!
      });
    }
    this.setState({
      id,
      buyTitle: title,
      buyPrice: price,
      buyDialogOpen: true
    });
  }

  closeAddDialog = e => this.setState({ addDialogOpen: false });

  closeEditDialog = e => this.setState({ editDialogOpen: false });

  closeBuyDialog = e => this.setState({ buyDialogOpen: false });


  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    const { rewards, coins } = this.props.shop;

    const rewardsList = rewards.map(reward => (
      <Grid
        key={reward._id}
        item={true}
        className={classes.rewardsGridItem}
        xs={12}
        sm={6}
        md={4}
      >
        <Reward
          title={reward.title}
          price={reward.price}
          description={reward.description}
          imageUrl={reward.imageUrl}
          edit={() => this.openEditDialog(reward._id, reward.title, reward.price, reward.description, reward.imageUrl)}
          buy={() => this.openBuyDialog(reward._id, reward.title, reward.price)}
        />
      </Grid >
    ));

    return (
      <>
        <Navbar navValue={2} />
        <main className={classes.main}>
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
          <Grid
            container={true}
            className={classes.rewardsGridContainer}
            spacing={16}
          >
            {rewardsList}
          </Grid>
          <Dialog
            aria-labelledby="Reward Creation"
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
          <Dialog
            aria-labelledby="Edit Reward"
            open={this.state.editDialogOpen}
            onClose={this.closeEditDialog}
          >
            <DialogTitle>Edit Reward</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Fields marked with * are required.
            </DialogContentText>
              <form onSubmit={this.addNewReward}>
                <input type="submit" style={{ visibility: 'hidden' }} />
                <TextField
                  onChange={this.inputChangedHandler}
                  value={this.state.editTitle}
                  autoFocus
                  type="text"
                  label="Reward title*"
                  name="editTitle"
                  margin="dense"
                  fullWidth
                  error={errors.editTitle ? true : false}
                  helperText={errors.editTitle ? errors.editTitle : null}
                />
                <TextField
                  onChange={this.inputChangedHandler}
                  value={this.state.editPrice}
                  type="number"
                  label="Reward price*"
                  name="editPrice"
                  margin="dense"
                  fullWidth
                  error={errors.editPrice ? true : false}
                  helperText={errors.editPrice ? errors.editPrice : null}
                  inputProps={{ min: 1, max: 1000000 }}
                />
                <TextField
                  onChange={this.inputChangedHandler}
                  value={this.state.editDescription}
                  type="text"
                  label="Reward description"
                  name="editDescription"
                  margin="dense"
                  fullWidth
                  error={errors.editDescription ? true : false}
                  helperText={errors.editDescription ? errors.editDescription : null}
                />
                <TextField
                  onChange={this.inputChangedHandler}
                  value={this.state.editImageUrl}
                  type="url"
                  label="Reward image URL"
                  name="editImageUrl"
                  margin="dense"
                  fullWidth
                  error={errors.editImageUrl ? true : false}
                  helperText={errors.editImageUrl ? errors.editImageUrl : null}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.deleteReward} className={classes.danger} variant="contained">
                Delete
            </Button>
              <Button onClick={this.editReward} color="secondary" variant="contained" size="large">
                Edit
            </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            aria-labelledby="Buy Reward"
            open={this.state.buyDialogOpen}
            onClose={this.closeBuyDialog}
          >
            <DialogTitle>Buy Reward</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to buy <strong>{this.state.buyTitle}</strong> for <strong>{this.state.buyPrice} coins</strong>?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.buyReward} color="secondary" variant="contained">
                Confirm purchase
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

export default connect(mapStateToProps, { logoutUser, setShop, addReward, editReward, deleteReward, updateCoins })(withRouter(withStyles(styles)(Shop)));
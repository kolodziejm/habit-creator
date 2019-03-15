import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import { ListItem, Button, Tooltip } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";

import { Link, withRouter } from "react-router-dom";

const drawerWidth = 200;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 64,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    position: "absolute",
    zIndex: theme.zIndex.drawer + 1
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    },
    marginRight: 20,
    marginLeft: -10
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#2e7d32",
    color: "#fff",
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  list: {
    fontFamily: "Montserrat"
  },
  logout: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto"
    }
  },
  drawer: {
    backgroundColor: "secondary",
    color: "inherit"
  },
  tabs: {
    marginLeft: "auto",
    marginRight: 64
  },
  tab: {
    height: 64,
    textAlign: "center"
  },
  mobileTitle: {
    marginTop: -40,
    marginBottom: 20
  }
});

class Navbar extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () =>
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));

  render() {
    const { classes, theme } = this.props;
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <Tabs value={this.props.navValue} className={classes.tabs}>
        <Tab
          label="Dashboard"
          className={classes.tab}
          component={Link}
          to="/"
        />
        <Tab
          label="Manage"
          className={classes.tab}
          component={Link}
          to="/manage"
        />
        <Tab label="Shop" className={classes.tab} component={Link} to="/shop" />
        <Tab
          label="Achievements"
          className={classes.tab}
          component={Link}
          to="/achievements"
        />
      </Tabs>
    );

    const authMobileLinks = (
      <List className={classes.list}>
        <Typography
          variant="h6"
          color="inherit"
          align="center"
          gutterBottom
          className={classes.mobileTitle}
        >
          Habit Creator
        </Typography>
        <ListItem
          button
          selected={this.props.navValue === 0}
          component={Link}
          to="/"
        >
          Dashboard
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={this.props.navValue === 1}
          component={Link}
          to="/manage"
        >
          Manage
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={this.props.navValue === 2}
          component={Link}
          to="/shop"
        >
          Shop
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={this.props.navValue === 3}
          component={Link}
          to="/achievements"
        >
          Achievements
        </ListItem>
        <Divider />
      </List>
    );

    const nonAuthLinks = (
      <Tabs value={this.props.navValue} className={classes.tabs}>
        <Tab label="Home" className={classes.tab} component={Link} to="/" />
        <Tab
          label="Login"
          className={classes.tab}
          component={Link}
          to="/login"
        />
        <Tab
          label="Register"
          className={classes.tab}
          component={Link}
          to="/register"
        />
      </Tabs>
    );

    const nonAuthMobileLinks = (
      <List className={classes.list}>
        <Typography
          variant="h6"
          color="inherit"
          align="center"
          gutterBottom
          className={classes.mobileTitle}
        >
          Habit Creator
        </Typography>
        <ListItem
          button
          selected={this.props.navValue === 0}
          component={Link}
          to="/"
        >
          Home
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={this.props.navValue === 1}
          component={Link}
          to="/login"
        >
          Login
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={this.props.navValue === 2}
          component={Link}
          to="/register"
        >
          Register
        </ListItem>
        <Divider />
      </List>
    );

    const drawer = (
      <div className={classes.drawer}>
        <div className={classes.toolbar} />
        {isAuthenticated ? authMobileLinks : nonAuthMobileLinks}
      </div>
    );

    return (
      <nav className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Habit Creator
            </Typography>
            <Hidden smDown>{isAuthenticated ? authLinks : nonAuthLinks}</Hidden>
            {isAuthenticated ? (
              <Tooltip title="Logout">
                <IconButton
                  color="inherit"
                  className={classes.logout}
                  onClick={() => this.props.logoutUser(this.props.history)}
                >
                  <PowerSettingsNew />
                </IconButton>
              </Tooltip>
            ) : null}
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(withStyles(styles, { withTheme: true })(withRouter(Navbar))));

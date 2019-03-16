import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import { Typography, Button, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Logo from "../../components/Logo/Logo";
import headerImg from "../../assets/images/header-landing.jpg";

import css from "./Landing.module.css";

const styles = theme => ({
  headingMain: {
    marginBottom: 16
  },
  headingSecondary: {
    marginBottom: 32
  },
  header: {
    padding: "64px 8px",
    backgroundImage: `linear-gradient(rgba(0, 230, 118, .8), rgba(0, 230, 118, .8)), url(${headerImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "60vh"
  },
  about: {
    padding: "48px 8px"
  },
  process: {
    padding: "32px 8px"
  },
  cta: {
    padding: "48px 8px",
    background: theme.palette.primary.main
  },
  content: {
    maxWidth: "960px",
    margin: "0 auto"
  },
  aboutTitle: {
    marginBottom: 32
  },
  processTitle: {
    marginBottom: 40
  },
  item: {
    marginTop: 16
  },
  footerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      display: "block"
    }
  },
  footer: {
    background: "#F0F0F0",
    padding: "32px 8px 0 8px"
  }
});

const Landing = ({ classes, theme }) => {
  return (
    <>
      <Navbar navValue={0} />
      <header className={classes.header}>
        <Typography
          className={classes.headingMain}
          component="h1"
          align="center"
          variant="h2"
        >
          Build your habits with joy.
        </Typography>
        <Typography
          className={classes.headingSecondary}
          component="h2"
          align="center"
          variant="h5"
        >
          Gain the momentum to change yourself with Habit Creator!
        </Typography>
        <Grid justify="center" container>
          <Button
            component={Link}
            to="/register"
            color="secondary"
            size="large"
            variant="contained"
          >
            Create account
          </Button>
        </Grid>
      </header>
      <main>
        <section className={classes.about}>
          <div className={classes.content}>
            <Typography
              className={classes.aboutTitle}
              align="center"
              variant="h4"
            >
              Build the habits you've always wanted
            </Typography>
            <Typography variant="body1">
              Do you want to develop a morning routine? Or workout every day in
              order to stay in shape? All of this and more is possible with
              Habit Creator. Simply set up the habits you want to build, put up
              the reward system to keep yourself motivated, and then increase
              the streak every day by doing the activities you want!
            </Typography>
          </div>
        </section>
        <section className={classes.process}>
          <div className={classes.content}>
            <Typography
              className={classes.processTitle}
              align="center"
              variant="h4"
            >
              How does it work?
            </Typography>
            <ol className={css.numlist}>
              <li className={css.numlist__item}>
                <Typography className={classes.item} variant="body1">
                  <b>Setup the activities</b> that you want to do daily. Be
                  specific about it, it'll help you stay consistent.{" "}
                  <b>These activities will refresh after each day.</b>
                </Typography>
                <Typography variant="body2">
                  Example: 20 minutes of jogging, 15 minutes of meditation, 50
                  push-ups
                </Typography>
              </li>
              <li className={css.numlist__item}>
                <Typography className={classes.item} variant="body1">
                  <b>Choose the difficulty</b> for each activity. The harder it
                  is the bigger rewards you'll get! Completing the activity will
                  grant you a specific amount of coins based on the difficulty.
                  You can use these coins in the Shop.
                </Typography>
              </li>
              <li className={css.numlist__item}>
                <Typography className={classes.item} variant="body1">
                  <b>Setup the reward system</b> in the Shop to motivate
                  yourself. Use the coins you earn through completing the
                  activities to purchase rewards.
                </Typography>
                <Typography variant="body2">
                  Example: A big tasty kebab for 3000 coins, one hour of playing
                  your favorite video game for 800 coins.
                </Typography>
              </li>
              <li className={css.numlist__item}>
                <Typography className={classes.item} variant="body1">
                  Complete the activities you've setup and then tick them in the
                  app.{" "}
                  <b>
                    {" "}
                    Keep the streak going to gain extra coins after each day!{" "}
                  </b>
                  Also you'll gain extra coins through
                  <b> milestone achievements </b>
                  along the way!
                </Typography>
              </li>
            </ol>
          </div>
        </section>
        <section className={classes.cta}>
          <div className={classes.content}>
            <Typography
              className={classes.processTitle}
              align="center"
              variant="h4"
            >
              Start building your habits today!
            </Typography>
            <Grid justify="center" container>
              <Button
                component={Link}
                to="/register"
                color="secondary"
                size="large"
                variant="contained"
              >
                Create account
              </Button>
            </Grid>
          </div>
        </section>
      </main>
      <footer className={classes.footer}>
        <div className={classes.content}>
          <div className={classes.footerContent}>
            <Typography align="center" variant="subtitle1">
              Copyright &copy; Marcin Kołodziej 2019
            </Typography>
            <Logo width={150} />
          </div>
        </div>
      </footer>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(Landing);

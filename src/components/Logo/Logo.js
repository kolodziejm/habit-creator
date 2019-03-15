import React from "react";
import { Link } from "react-router-dom";

import classes from "./logo.module.css";

export default props => (
  <figure className={classes.figure}>
    <Link to="/">
      <img
        width={props.width}
        className={classes.image}
        src={require("../../assets/images/logo.png")}
        alt="Habit Creator logo"
      />
    </Link>
  </figure>
);

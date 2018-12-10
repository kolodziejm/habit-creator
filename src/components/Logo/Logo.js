import React from 'react';

import classes from './logo.module.css';

export default (props) => (
  <figure className={classes.figure}>
    <img
      width={props.width}
      className={classes.image}
      src={require('../../assets/images/logo.png')}
      alt="Habit Creator logo" />
  </figure>
);
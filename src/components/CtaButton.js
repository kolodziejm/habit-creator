import React from 'react';

import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    backgroundImage: `linear-gradient(80deg, #00e676 70%, #76ff03)`,
    color: '#000',
    fontWeight: 'bold'
  }
}

const CtaButton = props => (
  <Button
    onClick={props.clicked}
    disabled={props.disabled}
    className={props.classes.root}
  >{props.children}</Button>
);

export default withStyles(styles)(CtaButton);
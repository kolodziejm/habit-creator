import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, IconButton } from '@material-ui/core';
import { Settings } from '@material-ui/icons';

const styles = {
  paper: {
    padding: '8px 12px 8px 24px',
    width: '100%'
  },
  firstLineWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  item: {
    marginBottom: '16px'
  }
};

class EditHabitItem extends Component {

  render() {
    const { classes } = this.props;

    return (
      <li className={classes.item}>
        <Paper className={classes.paper}>
          <div className={classes.firstLineWrapper}>
            <Typography variant="h6">{this.props.name}</Typography>
            <IconButton onClick={this.props.clicked} disableRipple>
              <Settings />
            </IconButton>
          </div>
          <Typography variant="body2">Current streak: {this.props.streak} {this.props.streak === 1 ? ' day' : ' days'}</Typography>
        </Paper>
      </li>
    )
  }
}

export default withStyles(styles)(EditHabitItem);
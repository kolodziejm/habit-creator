import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, IconButton } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import classnames from 'classnames';

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
  },
  textHabitFinished: {
    textDecoration: 'line-through',
    color: '#d3d3d3'
  }
};

class FinishHabitItem extends Component {

  render() {
    const { classes, isFinished } = this.props;

    return (
      <li className={classes.item}>
        <Paper className={classes.paper}>
          <div className={classes.firstLineWrapper}>
            <Typography variant="h6"
              className={classnames(isFinished ? classes.textHabitFinished : null)}>
              {this.props.name}
            </Typography>
            {!isFinished ? <IconButton onClick={this.props.clicked} disableRipple>
              <Check />
            </IconButton> : null}
          </div>
        </Paper>
      </li>
    )
  }
}

export default withStyles(styles)(FinishHabitItem);
import React from 'react'

import { Card, CardHeader, CardContent, CardMedia, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    listItem: {
        listStyle: 'none'
    },
    image: {
        height: 64,
        width: 64
    }
};

const achievement = props => {
    const { classes } = props;
  return (
    <li className={classes.listItem}>
      <Card className={classes.card}>
          <CardMedia
            component="img"
            alt={props.imageName}
            image={require(`../assets/achievementIcons/${props.imageName}`)}
            title={props.title}
            className={classes.image}
          />
        <CardContent>
          <Typography variant="h6" align="center">
            <strong>{props.title}</strong>
          </Typography>
          <Typography variant="subtitle1" align="center">
            {props.subtitle}
          </Typography>
          <Typography variant="body2" align="center">
            {props.value}
          </Typography>
        </CardContent>
      </Card>
    </li>
  )
}

export default withStyles(styles)(achievement);

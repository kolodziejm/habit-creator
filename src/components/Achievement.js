import React from 'react'

import { Card, CardHeader, CardContent, CardMedia, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  listItem: {
    listStyle: 'none',
    height: '100%'
  },
  card: {
    height: '100%',
    maxWidth: 280,
    margin: '0 auto'
  },
  image: {
    height: 64,
    width: 64,
    margin: '8px auto 0px auto'
  }
};
// TODO: Finished achievement styles
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
          <Typography variant="subtitle2" align="center">
            Reward: {props.value} coins
          </Typography>
        </CardContent>
      </Card>
    </li>
  )
}

export default withStyles(styles)(achievement);

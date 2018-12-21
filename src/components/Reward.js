// CARD
// IMG*
// TITLE
// DESC*
// PRICE
// BUY BTN, opens dialog in shop container

import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Button } from '@material-ui/core';

import theme from '../theme';

const styles = {
  card: {
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 426,
      margin: '0 auto'
    }
  },
  listItem: {
    height: '100%',
    listStyle: 'none',

  },
  cardActions: {
    justifyContent: 'center'
  },
};

const reward = props => {
  const { classes } = props;

  return (
    <li className={classes.listItem}>
      <Card className={classes.card}>
        {props.imageUrl ?
          <CardMedia
            component="img"
            alt={props.title}
            height="240"
            image={props.imageUrl}
            title={props.title}
          /> : null}
        <CardContent>
          <Typography variant="h6" align="center">
            {props.title}
          </Typography>
          {props.description ?
            <Typography variant="subtitle1" align="center">
              {props.description}
            </Typography> : null}
          <Typography variant="subtitle2" align="center">
            Cost: <strong>{props.price} coins</strong>
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            onClick={props.clicked}
            variant="contained"
            size="small"
            color="secondary">Buy</Button>
          <Button
            variant="outlined"
            size="small"
            color="secondary">Edit</Button>
        </CardActions>
      </Card>
    </li>
  )
}

export default withStyles(styles)(reward);

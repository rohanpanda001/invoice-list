import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

function SimpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
            <div className={classes.header}>
                <Grid container spacing={24}>
                    <Grid item xs={7}>
                        <Typography variant='headline'>INVOICE</Typography>
                        <Typography variant='subheading'>INVOICE</Typography>
                        <Typography variant='caption'>INVOICE</Typography>
                    </Grid>
                    <Grid item xs={4}>
                            <div className={classNames('row',classes.right)}>
                                <Typography variant='caption'>Customer Details</Typography>
                            </div>
                            <div className={classNames('row',classes.right)}>
                                <Typography variant='body2'>ROHAN PANDA</Typography>
                            </div>
                            <div className={classNames('row',classes.right)}>
                                <Typography variant='body1'>rohan.panda1@gmail.com</Typography>
                            </div>

                    </Grid>
                    <Grid item xs={1}>
                        <div className={classes.center}>
                        <Button variant="outlined" color="primary" className={classes.button}>
                            Print
                        </Button>
                        </div>

                    </Grid>
                </Grid>
            </div>

        </CardContent>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
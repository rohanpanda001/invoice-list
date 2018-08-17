import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Grid, Divider } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1,
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
  vertical : {
      marginTop : 10,
      marginBottom : 10
  }
};

function Row(props) {

    const { classes } = props;
    return (
        <div className={classes.root}>
            <Grid container spacing={24} className={classes.vertical}>
                <Grid item xs={6} className={classes.left}>
                    <Typography variant='body1'>Prawn and Chicken Sui Mui</Typography>
                </Grid>
                <Grid item xs={3} className={classes.center}>
                    <Typography variant='body1'>2</Typography>
                </Grid>
                <Grid item xs={3} className={classes.center}>
                    <Typography variant='body1'>430</Typography>
                </Grid>
            </Grid>
            <Divider />

        </div>
    );
}

Row.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Row);
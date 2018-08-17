

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import { Grid, Divider } from '@material-ui/core';
import classNames from 'classnames';
import ruppee from '../assets/ruppee.png';

const styles = {
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
    top : {
        paddingTop : 10
    },
    img : {
        width : 30,
        height : 30
    },
    bg : {
        backgroundColor : '#2e3742'
    }
};

function Item(props) {
  const { classes } = props;
  return (
    <div>
    <ListItem button>
        <Grid container spacing={24}>
            <Grid item xs={8}>
                <div className={classNames('row',classes.left)}>
                    <Typography variant='title'>Invoice # - 123</Typography>
                </div>
                <div className={classNames('row',classes.left)}>
                    <Typography >Items - 05</Typography>
                </div>
                <div className={classNames('row',classes.left)}>
                    <Typography color='primary'>Rohan Panda</Typography>
                </div>
            </Grid>
            <Grid item xs={4}>
            <div className={classNames('row',classes.right)}>
                    <Typography variant='subheading' color='textSecondary'>Time</Typography>
                </div>
                <div className={classNames('row',classes.right,classes.top)}>
                    <img src={ruppee} className={classes.img}/><Typography variant='title'>3982</Typography>
                </div>
            </Grid>
        </Grid>
    </ListItem>
    <Divider />   
    </div>
  );
}

Item.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Item);
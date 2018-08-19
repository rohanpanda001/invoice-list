

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
    current : {
        backgroundColor : '#7cba2f'
    },
};

function Item(props) {
  const { classes, invoice, id, setInvoice,currInvoice } = props;

  return (
    <div>
    <ListItem button onClick={() => setInvoice(id)} className={currInvoice === id ? classes.current : ""}>
        <Grid container spacing={24}>
            <Grid item xs={8}>
                <div className={classNames('row',classes.left)}>
                    <Typography variant='body1'>Invoice # {invoice.invoice_id}</Typography>
                </div>
                <div className={classNames('row',classes.left)}>
                    <Typography >Items - 05</Typography>
                </div>
                <div className={classNames('row',classes.left)}>
                    <Typography color='primary'>{invoice.name ? invoice.name : "--"}</Typography>
                </div>
            </Grid>
            <Grid item xs={4}>
            <div className={classNames('row',classes.right)}>
                    <Typography variant='caption' color='textSecondary'>{invoice.created_at}</Typography>
                </div>
                <div className={classNames('row',classes.right,classes.top)}>
                    <img src={ruppee} className={classes.img}/><Typography variant='title'>{invoice.total}</Typography>
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
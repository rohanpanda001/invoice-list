import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, Divider } from '@material-ui/core';
import Row from './itemRow';
import ruppee from '../assets/ruppee.png';
import print from '../assets/print.png';
import axios from 'axios';

const styles = {
  card: {
    minWidth: 275,
  },
  img : {
    width : 20,
    height : 20
  },
  printImg : {
    width : 20,
    height : 20,
    marginRight : 5
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
  vertical : {
      marginTop : 10,
      marginBottom : 10
  },
  top : {
      paddingTop : 20
  }
};

class Invoice extends React.Component {

    render() {
        const { classes, invoice,items } = this.props;

        return (
            invoice !== undefined ? 
            <div>
            <Card className={classes.card}>
                <CardContent>
                    <div className={classes.title}>
                        <Grid container spacing={24}>
                            <Grid item xs={7}>
                                <Typography variant='headline'>INVOICE</Typography>
                                <Typography variant='subheading'># {invoice.invoice_id ? invoice.invoice_id : "--"}</Typography>
                                <Typography variant='caption'>{invoice.created_at}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                    <div className={classNames('row',classes.right)}>
                                        <Typography variant='caption'>Customer Details</Typography>
                                    </div>
                                    <div className={classNames('row',classes.right)}>
                                        <Typography variant='body2'>{invoice.name ? invoice.name : "--"}</Typography>
                                    </div>
                                    <div className={classNames('row',classes.right)}>
                                        <Typography variant='body1'>{invoice.email ? invoice.email : "--"}</Typography>
                                    </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classes.center}>
                                <Button variant="outlined" color="primary" className={classes.button} onClick={() => window.print()}>
                                    <img src={print} className={classes.printImg}/>Print
                                </Button>
                                </div>

                            </Grid>
                        </Grid>
                    </div>

                    <div className={classes.header}>  
                        <Divider />
                        <Grid container spacing={24} className={classes.vertical}>
                            <Grid item xs={6} className={classes.left}>
                                <Typography variant='title'>Item</Typography>
                            </Grid>
                            <Grid item xs={3} className={classes.center}>
                                <Typography variant='title'>Quantity</Typography>
                            </Grid>
                            <Grid item xs={3} className={classes.center}>
                                <Typography variant='title'>Price</Typography>
                                <img src={ruppee} width='30' height='30'/>
                            </Grid>
                        </Grid>
                        <Divider />
                    </div>

                    <div className={classes.body}>  
                        {items !== undefined ? items.map((item,key) => <Row item={item} key={key}/>): ""}
                    </div>

                    <Grid container spacing={24} className={classes.vertical}>
                        <Grid item xs={6} className={classes.left}>
                        </Grid>
                        <Grid item xs={3} >
                            <div className={classNames('row',classes.center)}>
                                <Typography variant='body1'>Sub Total</Typography>
                            </div>
                            <div className={classNames('row',classes.center)}>
                                <Typography variant='body1'>Tax ({invoice.tax_percent}%)</Typography>
                            </div>
                            <div className={classNames('row',classes.center)}>
                                <Typography variant='body1'>Discount ({invoice.discount_percent}%)</Typography>
                            </div>

                            <div className={classNames('row',classes.center,classes.top)}>
                                <Typography variant='title'>Grand Total</Typography>
                            </div>
                            
                            
                        </Grid>
                        <Grid item xs={3}>
                            <div className={classNames('row',classes.center)}>
                                <img src={ruppee} className={classes.img}/><Typography variant='body1'>{invoice.subtotal}</Typography>
                            </div>
                            <div className={classNames('row',classes.center)}>
                                <img src={ruppee} className={classes.img}/><Typography variant='body1'>{invoice.tax}</Typography>
                            </div>
                            <div className={classNames('row',classes.center)}>
                                <img src={ruppee} className={classes.img}/><Typography variant='body1'>{invoice.discount}</Typography>
                            </div>
                            <div className={classNames('row',classes.center,classes.top)}>
                                <img src={ruppee} className={classes.img}/><Typography variant='title'>{invoice.total}</Typography>
                            </div>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
            </div>
            :
            <div></div>
        );
    }
}

Invoice.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Invoice);
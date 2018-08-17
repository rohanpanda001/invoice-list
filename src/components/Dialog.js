import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { Grid, Typography, Button, Divider, IconButton } from '@material-ui/core';
import skip from '../assets/skip.png'
import edit from '../assets/edit.png'
import TextField from '@material-ui/core/TextField';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import ruppee from '../assets/ruppee.png';

const styles = theme => ({
    right: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    vertical : {
        marginTop : 10,
        marginBottom : 10
    },
    printImg : {
        width : 15,
        height : 15,
        marginLeft : 5
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
    add : {
        marginTop : 10,
        marginBottom : 10
    },
    footer : {
        margin : 20
    }
});

class SimpleDialog extends React.Component {

    state = {
        customer : {},
        product : {},
        items: [],
        tax : 0.00,
        discount : 0.00,
        subtotal : 0.00,
        total : 0.00,
    }

    handleChange = (event) => {

        const { customer } = this.state;
        const name = event.target.name;
        const val = event.target.value;
        customer[name]=val;
        this.setState({ customer });

        // console.log(customer)
    }

    itemChange = (event) => {

        const { product, items, subtotal } = this.state;
        const name = event.target.name;
        const val = event.target.value;
        if (name === "tax")
        {
            product[name]=val;
            var taxPercent = parseFloat(val)
            var tax = taxPercent * subtotal / 100;
            var total = subtotal + tax;
            this.setState({tax, total});
        }
        else if (name === "discount")
        {
            product[name]=val;
            var DisPercent = parseFloat(val)
            var discount = DisPercent * subtotal / 100;
            var total = subtotal - discount;
            this.setState({discount, total});

        }
        else 
        {
            const id = event.target.id;

            if (items[id] === undefined)
                items[id]={}
            items[id][name]=val;
        }

        var price = 0.00;
        items.map((item) => price = price + parseInt(item['price']));

        this.setState({ product, items, subtotal : price });

    }

  
    render() {
      const { classes, onClose, open, handleProceed, status, onAbort, onEdit, number, increaseItem, handleSave } = this.props;

      const { customer, product} = this.state;

      const { TextArea } = Input;
  
      return (

        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
        >
          {/* <DialogTitle id="form-dialog-title">Create Invoice</DialogTitle>    */}
          <DialogContent>
          <Typography variant='display1'>Create Invoice</Typography>
          <Typography variant='heading'>Order No. 1234</Typography>

            {status === "customer" ?

                <Grid container spacing={24}>
                    <Grid item xs={8} className={classes.left}>
                        <Typography variant='title'>Customer Details</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={classes.right}>
                            <Button variant="outlined" color="primary" onClick={handleProceed}>
                                Skip
                                <img src={skip} className={classes.printImg}/>
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    

                    <Grid item xs= {6}>
                        <Typography>Name</Typography>
                        <Input placeholder="Full Name" onChange={this.handleChange} name='name' value={customer['name']}/>
                    </Grid>
                    <Grid item xs= {6}>
                        <Typography>Phone</Typography>
                        <Input addonBefore="+91" placeholder="Phone Number" onChange={this.handleChange} name='phone' value={customer['phone']}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Address</Typography>
                        <TextArea placeholder="Complete Address" autosize={{ minRows: 6, maxRows: 10 }} onChange={this.handleChange} name='address' value={customer['address']}/>
                    </Grid>
                    <Grid item xs= {6}>
                        <Typography>Email</Typography>
                        <Input placeholder="Email Address" onChange={this.handleChange} name='email' value={customer['email']}/>
                        <div style={{height : 20}}></div>
                        <Typography>Pincode</Typography>
                        <Input placeholder="Pincode" onChange={this.handleChange} name='pincode' value={customer['pincode']}/>
                    </Grid>

                </Grid>

                :
                <div>
                <Grid container spacing={24}>
                    <Grid item xs={4} className={classes.left}>
                        <Typography variant='title'>Product Details</Typography>
                    </Grid>
                    <Grid item xs={6}>
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
                    <Grid item xs={2}>
                        <div className={classes.right}>
                            <IconButton variant="outlined" color="primary" onClick={onEdit}>
                                <img src={edit} className={classes.printImg}/>
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    {/* Heading */}
                    <Grid item xs={6} className={classes.left}>
                        <Typography variant='subheading'>Item</Typography>
                    </Grid>
                    <Grid item xs={3} className={classes.center}>
                        <Typography variant='subheading'>Quantity</Typography>
                    </Grid>
                    <Grid item xs={3} className={classes.center}>
                        <Typography variant='subheading'>Price</Typography>
                        <img src={ruppee} width='30' height='30'/>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                {/* Items */}
                

                    {[...Array(number)].map((x, i) =>
                        // <ObjectRow key={i} />
                        <Grid container spacing={24} key={i}>
                            <Grid item xs={6} className={classes.left}>
                                <Input placeholder="Enter Item Name" name='name' onChange={this.itemChange} id={i}/>
                            </Grid>
                            <Grid item xs={3} className={classes.center}>
                                <Input placeholder="0.00" name='quantity' onChange={this.itemChange} id={i}/>
                            </Grid>
                            <Grid item xs={3} className={classes.center}>
                                <Input placeholder="0.00" name='price' onChange={this.itemChange} id={i}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                        </Grid>
                    )}

                    <div className={classes.right}>
                        <Button variant="outlined" color="primary" className={classes.add} onClick={increaseItem}>
                            Add Item
                        </Button>
                    </div>

                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={3} className={classes.left}>
                            <Input placeholder="Tax" addonAfter="%" name='tax' onChange={this.itemChange} value={product.tax}/>
                        </Grid>
                        <Grid item xs={3} className={classes.center}>
                            <Input placeholder="Discount" addonAfter="%" name='discount' onChange={this.itemChange} value={product.discount}/>
                        </Grid>
                        <Grid item xs={4} className={classes.right}>
                            <Typography variant='body2' color='textSecondary'>Sub Total</Typography>
                        </Grid>
                        <Grid item xs={2} className={classes.center}>
                            <img src={ruppee} width='20' height='20'/>
                            <Typography variant='body1'>{this.state.subtotal}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                    
                </div>

            }
          </DialogContent>

            {status === "customer" ?
                <DialogActions className={classes.footer}>
                    <Button onClick={onAbort} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={handleProceed} color="primary" variant='raised'>
                    Proceed
                    </Button>
                </DialogActions>

                :

                <div className={classes.footer}>
                    {/* <div className={classes.left}>
                        <Button onClick={onAbort} color="primary">
                        Cancel
                        </Button>
                    </div>
                    <Button onClick={onAbort} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" variant='raised'>
                    Save
                    </Button> */}
                    
                    <Grid container spacing={24}>
                        <Grid item xs={3}>
                            <div className={classNames('row',classes.left)}>
                                <Typography variant='heading' color='textSecondary'>Tax</Typography>
                            </div>
                            <div className={classNames('row',classes.left)}>
                                <img src={ruppee} width='20' height='20'/>
                                <Typography variant='body2'>{this.state.tax}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className={classNames('row',classes.left)}>
                                <Typography variant='heading' color='textSecondary'>Discount</Typography>
                            </div>
                            <div className={classNames('row',classes.left)}>
                                <img src={ruppee} width='20' height='20'/>
                                <Typography variant='body2'>{this.state.discount}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classNames('row',classes.right)}>
                                <Typography variant='heading' color='textSecondary'>Grand Total</Typography>
                            </div>
                            <div className={classNames('row',classes.right)}>
                                <img src={ruppee} width='20' height='20'/>
                                <Typography variant='body2'>{this.state.total}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={2} className={classes.center}>
                            <Button onClick={handleSave} color="primary" variant='raised'>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                    
                </div>
            }
        </Dialog>
      );
    }
  }
  
SimpleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleDialog);


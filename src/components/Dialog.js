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
import { Input, InputNumber } from 'antd';
import 'antd/dist/antd.css';
import ruppee from '../assets/ruppee.png';
import axios from 'axios'
import createHash from 'hash-generator';
import Cross from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    },
    tick : {
        height : 50,
        width : 50,
    },
});

class SimpleDialog extends React.Component {

    state = {
        customer : {},
        product : {},
        items : [{}],
        tax : 0.00,
        discount : 0.00,
        subtotal : 0.00,
        total : 0.00,
        status : 'customer',
        number : 1,
        success : false,
        validation : true
    }

    componentDidMount() {
        
        var hash = createHash(16);
        this.setState({order_no : hash})
    }

    increaseItem = () => {
        var items = this.state.items;
        items.push({})
        this.setState({ number: this.state.number + 1,  items});
        this.checkValidation()
    };

    onAbort = () => {
        this.props.handleClose();
        this.setState({ status : 'customer', number : 1, items : [{}], customer:{}, subtotal: 0, total : 0, tax : 0, discount : 0});
    };

    handleProceed = () => {
        this.setState({ status: 'product' });
    };

    onEdit = () => {
        this.setState({ status: 'customer' });
    };

    timeNow() {
        var d = new Date();
            // h = (d.getHours()<10?'0':'') + d.getHours(),
            // m = (d.getMinutes()<10?'0':'') + d.getMinutes(),
            // time = d.toLocaleTimeString(),
            // date = d.getDate(),
            // month = d.getMonth(),
            // year = d.getFullYear()

        return d.toLocaleDateString() + " " + d.toLocaleTimeString() ;
    }

    handleSave = () => {
        const {customer, product, items, order_no, tax, discount, subtotal, total} = this.state;
        // console.log(customer)

        var invoiceDetails = new FormData();

        invoiceDetails.set("invoice_id", order_no);
        invoiceDetails.set("tax_percent", product.tax ? product.tax : 0);
        invoiceDetails.set("discount_percent", product.discount ? product.discount : 0);
        invoiceDetails.set("tax", tax);
        invoiceDetails.set("discount", discount);
        invoiceDetails.set("subtotal", subtotal);
        invoiceDetails.set("total", total);
        invoiceDetails.set("created_at", this.timeNow());


        for(var key in customer) 
        {
            invoiceDetails.set(key, customer[key]);
        }

        // Set Invoice Details
        axios({
            method: 'post',
            url: 'http://localhost:5000/createInvoice',
            data: invoiceDetails,
            config: { headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'multipart/form-data', "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}}
        })
        .then(res => {

            // Set Item Details

            this.setState(
            {
                loading: true,
                success : false
            },
            () => {
                setTimeout(() => {
                    
                    var itemDetails = {};

                    itemDetails["invoice_id"] =  order_no;

                    itemDetails["items"] = items;
                
                    axios({
                        method: 'post',
                        url: 'http://localhost:5000/createItems',
                        data: itemDetails,
                        config: { headers: {'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}}
                    })
                    .then(res => {
                        // console.log(res.data);
                            this.setState({success : true, loading : false})
                            
                        })
                    .catch(function (error) {
                        console.log(error);
                    });
                }, 2000);
            });
         
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    handleChange = (event) => {

        const { customer } = this.state;
        const name = event.target.name;
        const val = event.target.value;
        customer[name]=val;
        this.setState({ customer });

        // console.log(customer)
    }

    itemChange = (event) => {

        const { product, items, subtotal, tax, discount } = this.state;
        const name = event.target.name;
        const val = event.target.value;

        var new_tax = tax, new_discount=discount, new_subtotal=0.00;

        if (name === "tax")
        {
            product[name]=val; 
            if(val!=="")
            {
                var taxPercent = parseFloat(val)
                new_tax = taxPercent * subtotal / 100;

                this.setState({tax : new_tax});
            }
            else
            {
                new_tax = 0;
                this.setState({tax : 0});
            }
        }
        else if (name === "discount")
        {
            product[name]=val;
            if(val!=="")
            {
                var DisPercent = parseFloat(val)
                new_discount = DisPercent * subtotal / 100;

                this.setState({discount : new_discount});
            }
            else
            {
                new_discount = 0;
                this.setState({discount : 0});
            }

        }
        else 
        {
            const id = event.target.id;
            const isInteger = /^[0-9]+$/;
            if (name !== "name")
            {
                if (val === "")
                    items[id][name]=0.00;
                else if(isInteger.test(val))
                    items[id][name]=val;

            }
            else
                items[id][name]=val;


            this.setState({items})

        }

        // Calculation
        if (name === "price" || name === "tax" || name === "discount")
        {
            items.map((item) => new_subtotal += parseInt(item['price']) * (item['quantity'] ? parseInt(item['quantity']) : 1));
            this.setState({ product, subtotal : new_subtotal});

            this.setState({total : new_subtotal + new_tax - new_discount})
        }

        // Validation
        this.checkValidation()

    }

    checkValidation= () => 
    {
        const { items } = this.state;
        var filledUp = true
        for(var i = 0 ; i < items.length ; i++){
            if(items[i].name===undefined || items[i].price===undefined || items[i].quantity===undefined) 
            {
                filledUp =false 
            }
        }
        if (filledUp)
            this.setState({validation : false})
        else
            this.setState({validation : true})
    }

    handleSuccess = () => {
        var hash = createHash(16)
        this.setState({order_no : hash, success: false})
        this.onAbort()
        this.props.handleClose()

        this.props.showInvoices('all')

    }

    onItemDelete = (index) => {
        const { items, number } = this.state;

        items.splice(index,1)
        this.setState({items, number : number-1})

        console.log(items)
    }
  
    render() {
      const { classes , open, handleClose} = this.props;

      const { customer, product, items, number, status, order_no, success, loading} = this.state;

      const { TextArea } = Input;

      return (

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
        { loading ?
            <DialogContent className={classes.center}>
                <CircularProgress size={30} className={classes.buttonProgress} />
            </DialogContent>
            :
            success ?
            <div>
                <DialogTitle id="alert-dialog-slide-title">
                Invoice Created Successfully
                </DialogTitle>
                <DialogContent className={classes.center}>
                    <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png" height='250' width='200'/>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleSuccess} color="primary">
                    Done
                </Button>
                </DialogActions>
            </div>

            :
            
            <div>
            <DialogContent>
            <Typography variant='display1'>Create Invoice</Typography>
            <Typography variant='heading'>Order No. {order_no}</Typography>

                {status === "customer" ?

                    <Grid container spacing={24}>
                        <Grid item xs={8} className={classes.left}>
                            <Typography variant='title'>Customer Details</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.right}>
                                <Button variant="outlined" color="primary" onClick={this.handleProceed}>
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
                            <Input addonBefore="+91" placeholder="Phone Number" type="number" onChange={this.handleChange} name='phone' value={customer['phone']}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Address</Typography>
                            <TextArea placeholder="Complete Address" autosize={{ minRows: 6, maxRows: 10 }} onChange={this.handleChange} name='address' value={customer['address']}/>
                        </Grid>
                        <Grid item xs= {6}>
                            <Typography>Email</Typography>
                            <Input placeholder="Email Address" onChange={this.handleChange} type='email' name='email' value={customer['email']}/>
                            <div style={{height : 20}}></div>
                            <Typography>Pincode</Typography>
                            <Input placeholder="Pincode" onChange={this.handleChange} type='number' name='pincode' value={customer['pincode']}/>
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
                                <Typography variant='body2'>{ customer['name'] ? customer['name'] : "--"}</Typography>
                            </div>
                            <div className={classNames('row',classes.right)}>
                                <Typography variant='body1'>{customer['email'] ? customer['email'] : "--"}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div className={classes.right}>
                                <IconButton variant="outlined" color="primary" onClick={this.onEdit}>
                                    <img src={edit} className={classes.printImg}/>
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        {/* Heading */}
                        <Grid item xs={7} className={classes.left}>
                            <Typography variant='subheading'>Item</Typography>
                        </Grid>
                        <Grid item xs={2} className={classes.center}>
                            <Typography variant='subheading'>Quantity</Typography>
                        </Grid>
                        <Grid item xs={3} className={classes.left}>
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
                                <Grid item xs={7} className={classes.left}>
                                    <Input placeholder="Enter Item Name" name='name' onChange={this.itemChange} id={i} value={items[i].name}/>
                                </Grid>
                                <Grid item xs={2} className={classes.center}>
                                    <Input placeholder="0.00" name='quantity' type='number' onChange={this.itemChange} id={i} value={items[i].quantity}/>
                                </Grid>
                                <Grid item xs={2} className={classes.center}>
                                    <Input placeholder="0.00" name='price' type='number' onChange={this.itemChange} id={i} value={items[i].price}/>
                                </Grid>
                                <Grid item xs={1} className={classes.center}>
                                    <IconButton onClick={() => this.onItemDelete(i)}>
                                        <Cross />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                            </Grid>
                        )}

                        <div className={classes.right}>
                            <Button variant="outlined" color="primary" className={classes.add} onClick={this.increaseItem}>
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
                        <Button onClick={this.onAbort} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.handleProceed} color="primary" variant='raised'>
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
                                    <Typography color='textSecondary'>Tax</Typography>
                                </div>
                                <div className={classNames('row',classes.left)}>
                                    <img src={ruppee} width='20' height='20'/>
                                    <Typography variant='body2'>{this.state.tax}</Typography>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div className={classNames('row',classes.left)}>
                                    <Typography color='textSecondary'>Discount</Typography>
                                </div>
                                <div className={classNames('row',classes.left)}>
                                    <img src={ruppee} width='20' height='20'/>
                                    <Typography variant='body2'>{this.state.discount}</Typography>
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={classNames('row',classes.right)}>
                                    <Typography color='textSecondary'>Grand Total</Typography>
                                </div>
                                <div className={classNames('row',classes.right)}>
                                    <img src={ruppee} width='20' height='20'/>
                                    <Typography variant='body2'>{this.state.total}</Typography>
                                </div>
                            </Grid>
                            <Grid item xs={2} className={classes.center}>
                                <Button onClick={this.onAbort} color="primary">
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={2} className={classes.center}>
                                <Button 
                                    onClick={this.handleSave} 
                                    color="primary" 
                                    variant='raised'
                                    disabled={this.state.validation}
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                        
                    </div>
                }
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


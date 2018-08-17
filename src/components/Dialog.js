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
        marginTop : 10
    }
});

class SimpleDialog extends React.Component {

    state = {
        items : 1
    }

    
  
    render() {
      const { classes, onClose, open, handleProceed, status, onAbort, onEdit } = this.props;
      const {items} =this.state;

      const { TextArea } = Input;
  
      return (

        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create Invoice</DialogTitle>
          <DialogContent>

            {status === "customer" ?

                <Grid container spacing={24}>
                    <Grid item xs={8} className={classes.left}>
                        <Typography variant='heading'>Customer Details</Typography>
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
                        <Input placeholder="Full Name" />
                    </Grid>
                    <Grid item xs= {6}>
                        <Typography>Phone</Typography>
                        <Input addonBefore="+91" placeholder="Phone Number" />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Address</Typography>
                        <TextArea placeholder="Complete Address" autosize={{ minRows: 6, maxRows: 10 }} />
                    </Grid>
                    <Grid item xs= {6}>
                        <Typography>Email</Typography>
                        <Input placeholder="Email Address" />
                        <div style={{height : 20}}></div>
                        <Typography>Pincode</Typography>
                        <Input placeholder="Pincode" />
                    </Grid>

                </Grid>

                :
                <div>
                <Grid container spacing={24}>
                    <Grid item xs={4} className={classes.left}>
                        <Typography variant='heading'>Customer Details</Typography>
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
                

                    {[...Array(items)].map((x, i) =>
                        // <ObjectRow key={i} />
                        <Grid container spacing={24}>
                            <Grid item xs={6} className={classes.left}>
                                <Input placeholder="Enter Item Name" />
                            </Grid>
                            <Grid item xs={3} className={classes.center}>
                                <Input placeholder="0.00" />
                            </Grid>
                            <Grid item xs={3} className={classes.center}>
                                <Input placeholder="0.00" />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                        </Grid>
                    )}

                    <div className={classes.right}>
                        <Button variant="outlined" color="primary" className={classes.add} onClick={() => this.setState({items : items + 1})}>
                            Add Item
                        </Button>
                    </div>
                    
                </div>

            }
          </DialogContent>
          <DialogActions>
            <Button onClick={onAbort} color="primary">
              Cancel
            </Button>
            <Button onClick={handleProceed} color="primary" variant='raised'>
              Proceed
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
  }
  
SimpleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleDialog);


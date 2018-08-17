import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { Grid, Typography, Button, Divider } from '@material-ui/core';
import skip from '../assets/skip.png'
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
});

class SimpleDialog extends React.Component {
  
    render() {
      const { classes, onClose, open, handleProceed, status, onAbort } = this.props;

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

                <Grid container spacing={24}>
                    <Grid item xs={8} className={classes.left}>
                        <Typography variant='heading'>Product Details</Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                </Grid>

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


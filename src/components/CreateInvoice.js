import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from './Dialog';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    marginBottom : 10,
    ...theme.mixins.toolbar,
  },
});




class CreateInvoice extends React.Component {

    state = {
        open: false,
        status : 'customer'
    };
    
    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    onAbort = () => {
        this.setState({ open: false, status : 'customer' });
    };

    handleProceed = () => {
        this.setState({ status: 'product' });
    };


    render() {
        const { classes, theme, open } = this.props;

        return (
        <div>     
            <div className={classes.drawerHeader}>
                <Button variant="fab" color="primary" aria-label="Add" onClick={this.handleClickOpen}>
                    <AddIcon />
                </Button>
                <Dialog
                    open={this.state.open}
                    status={this.state.status}
                    onClose={this.handleClose}
                    handleProceed={this.handleProceed}
                    onAbort = {this.onAbort}
                />
            </div>  
        </div>
        );
    }
}

CreateInvoice.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CreateInvoice);
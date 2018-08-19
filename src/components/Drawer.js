import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import InvoiceItem from './InvoiceItem';
import { Input } from 'antd';
import 'antd/dist/antd.css';

const drawerWidth = 350;
const Search = Input.Search;


const styles = {
  root: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
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
  search : {
      margin : 20,
      width : '90%'
  }
};

function Row(props) {

    const { classes,open, invoiceList, setInvoice } = props;
    return (
            <Drawer
                variant="persistent"
                anchor='left'
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Search
                    placeholder="Search Invoice"
                    onSearch={value => console.log(value)}
                    enterButton
                    className={classes.search}
                />
                <List component="nav">
                    {invoiceList.map((invoice,index) => <InvoiceItem invoice={invoice} setInvoice={setInvoice} id={index}/>)}
                </List>
            </Drawer>
    );
}

Row.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Row);
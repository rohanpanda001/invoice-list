import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import InvoiceItem from './InvoiceItem';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Typography } from '@material-ui/core';

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
    margin : 10
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
  },
  showResults : {
  }
};

class DrawerClass extends React.Component {

    state= {
        showResults : false,
    }

    search = (value) => {

        this.setState({showResults: true})

        this.props.showInvoices(value)
    }

    render() {

        const { classes,open, setInvoice, invoiceList, currInvoice } = this.props;

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
                        onSearch={this.search}
                        enterButton
                        className={classes.search}
                    />
                    {this.state.showResults ? 
                        <div className={classes.left}>
                            <Typography className={classes.showResults} variant='subheading' color='primary'>Search Results</Typography>
                        </div>
                    :""}
                    <List component="nav">
                        { invoiceList.length > 0 ?
                            invoiceList.map((invoice,index) => 
                                <InvoiceItem 
                                    currInvoice={currInvoice} 
                                    invoice={invoice} 
                                    setInvoice={setInvoice} 
                                    id={index}
                                    key={index}
                                />
                            )
                            :
                            <Typography className={classes.center} variant='subheading' color='textSecondary'>{this.state.showResults ? "No results Found" : "No Invoice Found"}</Typography>
                        }
                    </List>
                </Drawer>
        );
    }
}

DrawerClass.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerClass);
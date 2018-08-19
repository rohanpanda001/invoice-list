import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import InvoiceItem from './InvoiceItem';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';

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

class DrawerClass extends React.Component {

    state = {
        list : []
    }

    componentDidMount() {

        this.setState({list : this.props.invoiceList})
      }

    search = (value) => {

        var data = new FormData();
        data.set("invoice_id", value);

        axios({
            method: 'post',
            url: 'http://localhost:5000/filterInvoice',
            data : data,
            config: { headers: {'Content-Type': 'multipart/form-data' ,'Access-Control-Allow-Origin': '*'}}
        })
        .then(res => {
            console.log(res.data)
            var list = [], obj;
            res.data.map((invoice) => {
                obj = {};
                obj['id']=invoice[0];
                obj['invoice_id']=invoice[1];
                obj['name']=invoice[2];
                obj['email']=invoice[3];
                obj['phone']=invoice[4];
                obj['address']=invoice[5];
                obj['pincode']=invoice[6];
                obj['subtotal']=invoice[7];
                obj['tax']=invoice[8];
                obj['discount']=invoice[9];
                obj['tax_percent']=invoice[10];
                obj['discount_percent']=invoice[11];
                obj['created_at']=invoice[12];
                obj['total']=invoice[13];

                list.push(obj)
            })
            this.setState({list})
        })
        .catch(function (error) {
            console.log(error); 
        });
    }

    render() {

        const { classes,open, setInvoice } = this.props;
        const {list} = this.state;

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
                    <List component="nav">
                        {list.map((invoice,index) => <InvoiceItem invoice={invoice} setInvoice={setInvoice} id={index}/>)}
                    </List>
                </Drawer>
        );
    }
}

DrawerClass.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerClass);
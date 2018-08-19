import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from './components/Drawer.js';
import Invoice from './components/Invoice';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CreateInvoice from './components/CreateInvoice';
import axios from 'axios';

const drawerWidth = 350;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    marginBottom : 10,
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
});

class Content extends React.Component {

  state = {
    invoiceList : [],
    currInvoice : 0,
    items : [],
    reload : false
  }

  showInvoices = (invoice) => {

    var url='http://localhost:5000/filterInvoice'

    if (invoice === "all")
      url =  'http://localhost:5000/showAll'

    console.log('here')
    axios({
      method: 'post',
      url: url,
      // data : "",
      config: { headers: {'Content-Type': 'multipart/form-data' ,'Access-Control-Allow-Origin': '*'}}
    })
    .then(res => {
      var data = res.data, obj;
      var list = [];
      data.map((invoice) => {
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

      this.setState({invoiceList : list})

    })
    .catch(function (error) {
      console.log(error); 
    });

  }

  componentDidMount() {

    axios({
      method: 'post', 
      url: 'http://localhost:5000/showAll',
      // data : "",
      config: { headers: {'Content-Type': 'multipart/form-data' ,'Access-Control-Allow-Origin': '*'}}
    })
    .then(res => {
        var data = res.data, obj;
        var list = [];
        data.map((invoice) => {
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

        var data = new FormData();
        data.set("invoice_id", list[0].invoice_id);

        axios({
            method: 'post',
            url: 'http://localhost:5000/getItems',
            data : data,
            config: { headers: {'Content-Type': 'multipart/form-data' ,'Access-Control-Allow-Origin': '*'}}
        })
        .then(res => {
            this.setState({items: res.data, invoiceList : list})
        })
        .catch(function (error) {
            console.log(error); 
        });
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  setInvoice = (x) => {

    var invoice = this.state.invoiceList[x];

    var data = new FormData();
    data.set("invoice_id", invoice.invoice_id);

    axios({
        method: 'post',
        url: 'http://localhost:5000/getItems',
        data : data,
        config: { headers: {'Content-Type': 'multipart/form-data' ,'Access-Control-Allow-Origin': '*'}}
    })
    .then(res => {
        this.setState({items: res.data})
    })
    .catch(function (error) {
        console.log(error); 
    });

    this.setState({currInvoice : x})
  }


  render() {
    const { classes, theme, open } = this.props;
    const {invoiceList, currInvoice,items} =this.state;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          {invoiceList.length > 0 ? 
            <Drawer open={open} invoiceList={invoiceList} setInvoice={this.setInvoice} showInvoices={this.showInvoices} currInvoice={currInvoice}/>
          :""}
          <main
            className={classNames(classes.content, classes[`content-left`], {
              [classes.contentShift]: open,
              [classes[`contentShift-left`]]: open,
            })}
          >
            <CreateInvoice  showInvoices={this.showInvoices}/>

            {invoiceList.length > 0 ? 
              <Invoice invoice={invoiceList[currInvoice]} items={items}/>
            :""}
            
          </main>
        </div>
      </div>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Content);
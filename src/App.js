import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Appbar from './components/Appbar';
import Content from './components/Content';

class App extends Component {

  state = {
    open: true,
    // anchor: 'left',
  };

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };


  render() {
    const { open } = this.state;
    return (
      <div>
        <Appbar 
          open={open}
          handleDrawerToggle={this.handleDrawerToggle}
        />
        <Content 
          open={open}
        />
      </div>

    );
  }
}

export default App;

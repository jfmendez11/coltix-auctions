import React, { Component } from 'react';
import PropTypes from "prop-types";

import Navbar from "./Navbar";

export default class App extends Component {
  constructor(props) {
      super(props);
      this.state = {

      };
  }


  render() {
    return (
        <div>  
        <Navbar>
            
        </Navbar>
        <div>
        
        </div>
      </div>
    )
  }
};

App.propTypes = {

};
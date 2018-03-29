import React, { Component } from 'react';
import PropTypes from "prop-types";

import Navbar from "./Navbar";
import Welcome from "./Welcome";
import Events from "./events/Events";

export default class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        events: [
          {
            name: "Millonarios vs Nacional",
            imgSrc: "img/ticket.svg",
            venue: "Estadio El Campín",
            date: new Date("2018-11-25"),
          },
          {
            name: "Millonarios vs Nacional",
            imgSrc: "img/ticket.svg",
            venue: "Estadio El Campín",
            date: new Date("2018-11-25"),
          },
          {
            name: "Millonarios vs Nacional",
            imgSrc: "img/ticket.svg",
            venue: "Estadio El Campín",
            date: new Date("2018-11-25"),
          },
          {
            name: "Millonarios vs Nacional",
            imgSrc: "img/ticket.svg",
            venue: "Estadio El Campín",
            date: new Date("2018-11-25"),
          },
        ]
      };
  }


  render() {
    return (
      <div>
        <header>
          <Navbar></Navbar>
        </header>  
        <Welcome></Welcome>
        <Events events={this.state.events}></Events>
      </div>
    )
  }
};

App.propTypes = {

};
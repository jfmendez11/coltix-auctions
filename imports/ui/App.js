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
            _id: "1",
            name: "Millonarios vs Nacional",
            imgSrc: "/public/images/ticket.svg",
            venue: "Estadio El Campín",
            date: new Date("2018-11-25"),
            tickets: [
              {
                location: "Occidenteal General Baja",
                bids: 0,
                currentBid: 0,
                buyNow: 80000,
                dueDate: new Date("2018-11-25")
              },
              {
                location: "Oriental Central Baja",
                bids: 2,
                currentBid: 45000,
                buyNow: 60000,
                dueDate: new Date("2018-11-25")
              },
              {
                location: "Lateral Sur",
                bids: 1,
                currentBid: 500,
                buyNow: 20000,
                dueDate: new Date("2018-11-25")
              },
              {
                location: "Lateral Norte",
                bids: 4,
                currentBid: 2300,
                buyNow: 20000,
                dueDate: new Date("2018-11-25")
              },
            ],
          },
          {
            _id: "2",
            name: "Festival Estereo Picnic",
            imgSrc: "/public/images/ticket.svg",
            venue: "Parque 222",
            date: new Date("2018-03-23"),
            tickets: [
              {
                location: "Combo 3 días",
                bids: 4,
                currentBid: 450000,
                buyNow: 500000,
                dueDate: new Date("2018-03-23")
              },
              {
                location: "2 Día",
                bids: 1,
                currentBid: 250000,
                buyNow: 310000,
                dueDate: new Date("2018-03-23")
              },
              {
                location: "Días 1 y 2",
                bids: 3,
                currentBid: 4750000,
                buyNow: 550000,
                dueDate: new Date("2018-03-23")
              },
              {
                location: "Día 1",
                bids: 3,
                currentBid: 200000,
                buyNow: 310000,
                dueDate: new Date("2018-03-23")
              },
            ],
          },
        ],
        view: "home",
      };
  }

  onClickEvent() {
    this.setState({view: "events"})
  }

  render() {
    let currentView = this.state.view === "home" ? <Events events={this.state.events} onClickEvent={this.onClickEvent.bind(this)}></Events> : <Tickets tickets={[]}></Tickets>;
    let showWelcome = this.state.view === "home" ? <Welcome></Welcome> : "";
    return (
      <div>
        <header>
          <Navbar></Navbar>
        </header>
        {showWelcome}  
        {currentView}
      </div>
    )
  }
};

App.propTypes = {

};
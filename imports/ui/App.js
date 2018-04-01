import React, { Component } from 'react';
import PropTypes from "prop-types";

import Navbar from "./Navbar";
import Welcome from "./Welcome";
import Events from "./events/Events";
import Tickets from "./tickets/Tickets";

export default class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        events: [
          {
            _id: "1",
            name: "Millonarios vs Nacional",
            imgSrc: "https://image.flaticon.com/icons/svg/55/55238.svg",
            venue: "Estadio El Campín",
            date: new Date("2018-11-25"),
            tickets: [
              {
                description: "Occidenteal General Baja",
                increments: 1000,
                bids: 0,
                currentBid: 0,
                buyNow: 80000,
                dueDate: new Date("2018-11-25")
              },
              {
                description: "Oriental Central Baja",
                increments: 1000,
                bids: 2,
                currentBid: 45000,
                buyNow: 60000,
                dueDate: new Date("2018-11-25")
              },
              {
                description: "Lateral Sur",
                increments: 1000,
                bids: 1,
                currentBid: 500,
                buyNow: 20000,
                dueDate: new Date("2018-11-25")
              },
              {
                description: "Lateral Norte",
                increments: 1000,
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
            imgSrc: "https://image.flaticon.com/icons/svg/55/55238.svg",
            venue: "Parque 222",
            date: new Date("2019-03-23"),
            tickets: [
              {
                description: "Combo 3 días",
                increments: 1000,
                bids: 4,
                currentBid: 450000,
                buyNow: 500000,
                dueDate: new Date("2019-03-23")
              },
              {
                description: "2 Día",
                increments: 1000,
                bids: 1,
                currentBid: 250000,
                buyNow: 310000,
                dueDate: new Date("2019-03-23")
              },
              {
                description: "Días 1 y 2",
                increments: 1000,
                bids: 3,
                currentBid: 4750000,
                buyNow: 550000,
                dueDate: new Date("2019-03-23")
              },
              {
                description: "Día 1",
                increments: 1000,
                bids: 3,
                currentBid: 200000,
                buyNow: 310000,
                dueDate: new Date("2019-03-23")
              },
            ],
          },
        ],
        view: "home",
        currentEvent: {},
        currentTicket: {},
      };
  }

  onClickEvent(event) {
    this.setState({view: "event", currentEvent: event});
  }

  handleSubmitEvent(event) {
    let eventsList = this.state.events;
    eventsList.push(event);
    this.setState({
      events: eventsList,
    });
  }

  handleSubmitTicket(ticket) {
    let eventsList = this.state.events;
    for (let i = 0; i < eventsList.length; i++) {
      if(eventsList[i]._id === this.state.currentEvent._id) {
        eventsList[i].tickets.push(ticket);
        break;
      }
    }
    this.setState({
      events: eventsList,
    })
  }

  homeClick() {
    this.setState({view: "home", currentTicket: {}, currentEvent: {}});
  }

  homeWrapper() {
    return (
      <div>
        <Welcome></Welcome>
        <Events events={this.state.events} onClickEvent={this.onClickEvent.bind(this)} handleSubmitEvent={this.handleSubmitEvent.bind(this)}></Events>
      </div>
    );
  }

  ticketWrapper() {
    return (
      <Tickets event={this.state.currentEvent} handleSubmitTicket={this.handleSubmitTicket.bind(this)}/>
    );
  }

  render() {
    let currentView = this.state.view === "home" ? this.homeWrapper() : this.ticketWrapper();
    return (
      <div>
        <header>
          <Navbar homeClick={this.homeClick.bind(this)}></Navbar>
        </header>
        {currentView}
      </div>
    )
  }
};

App.propTypes = {

};
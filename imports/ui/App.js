import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";

import { EventsDB } from "../api/events";

import Navbar from "./Navbar";
import Welcome from "./Welcome";
import Events from "./events/Events";
import Tickets from "./tickets/Tickets";

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        view: "home",
        currentEvent: {},
      };
  }

  onClickEvent(event) {
    this.setState({view: "event", currentEvent: event});
  }

  handleSubmitEvent(event) {
    EventsDB.insert(event);
  }

  handleSubmitTicket(ticket) {
    let ticketList = this.state.currentEvent.tickets;
    ticketList.push(ticket);
    EventsDB.update(this.state.currentEvent._id, {
      $set: {tickets: ticketList}
    });
  }

  handleBidSubmit(ticket) {
    let ticketList = this.state.currentEvent.tickets;
    for (let i = 0; i < ticketList.length; i++) {
      if (ticketList[i].id === ticket.id) {
        ticketList[i] = ticket;
        break;
      }
    }
    EventsDB.update(this.state.currentEvent._id, {
      $set: {tickets: ticketList}
    });
  }

  homeClick() {
    this.setState({view: "home", currentEvent: {}});
  }

  onClickSearch(eventName) {
    let event = {};
    for (let i = 0; i < this.props.events.length; i++) {
      if(this.props.events[i].name === eventName) {
        event = this.props.events[i];
        break;
      }
    }
    if(event.name === eventName) {
      this.setState({view: "event", currentEvent: event});
    }
  }

  homeWrapper() {
    return (
      <div>
        <Welcome></Welcome>
        <Events events={this.props.events} onClickEvent={this.onClickEvent.bind(this)} handleSubmitEvent={this.handleSubmitEvent.bind(this)}></Events>
      </div>
    );
  }

  ticketWrapper() {
    return (
      <Tickets event={this.state.currentEvent} handleBidSubmit={this.handleBidSubmit.bind(this)} handleSubmitTicket={this.handleSubmitTicket.bind(this)}/>
    );
  }

  render() {
    let currentView = this.state.view === "home" ? this.homeWrapper() : this.ticketWrapper();
    return (
      <div>
        <header>
          <Navbar homeClick={this.homeClick.bind(this)} events={this.props.events} onClickSearch={this.onClickSearch.bind(this)}></Navbar>
        </header>
        {currentView}
      </div>
    )
  }
};

App.propTypes = {
  events: PropTypes.array.isRequired,
};

export default withTracker(() => {
  return {
    events: EventsDB.find({}).fetch(), 
  };
})(App);
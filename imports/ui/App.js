import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { EventsDB } from "../api/events";
import Navbar from "./Navbar";
import Welcome from "./Welcome";
import Events from "./events/Events";
import { Accounts } from 'meteor/accounts-base';

// import Tickets from './tickets/Tickets';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "Name",
    }
  }

  _onSelect(selected) {
    console.log(selected.value);
    this.setState({order: selected.value});
  }

  render() {
    let events = this.props.events;
    if (this.state.order === "Date") events = EventsDB.find({}, {sort: {date: 1}}).fetch();
    else if(this.state.order === "Venue") events = EventsDB.find({}, {sort: {venue: 1}}).fetch();
    return (
      <div>
        <div>
          <Welcome></Welcome>
          <Navbar events={this.props.events} onClickSearch={this.props.onClickSearch}></Navbar>
          <Events events={events} currentUser={this.props.currentUser} _onSelect={this._onSelect.bind(this)}></Events>
        </div>
      </div>
    );
  }
};

export default withTracker(() => {
  Meteor.subscribe('allEvents');
  return {
    events: EventsDB.find({"date": { $gte: new Date()}}, { sort: { name: 1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);
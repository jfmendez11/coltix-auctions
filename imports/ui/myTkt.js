import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { EventsDB, BidsDB, TicketsDB } from "../api/events";
import Navbar from "./Navbar";
import Events from "./events/Events";
import { Accounts } from 'meteor/accounts-base';

import Ticket from './tickets/Ticket';

class myTkt extends Component {

  renderTickets(tkts){
    return tkts.length > 0? tkts.map((t, i) =>
        <Ticket key={i} ticket={t}></Ticket>
      ):"";
  }

  render() {    
    return (
      <div className="tickets">
      <Navbar></Navbar>
      <div className="container container-2">
        <div className="row justify-content-center align-self-center">
          <h3 className="raleway">My Tickets</h3>
        </div>
        <hr />
        <div className="row justify-content-center align-self-center">
          {this.renderTickets(this.props.list)}
        </div>
        <hr />
      </div>
    </div>
    );
  }
};

export default withTracker(() => {
  Meteor.subscribe('myTickets');
  return {
    list: TicketsDB.find().fetch()
  };
})(myTkt);
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { BidsDB, TicketsDB } from "../api/events";
import Navbar from "./Navbar";
import Events from "./events/Events";
import { Accounts } from 'meteor/accounts-base';

import Ticket from './tickets/Ticket';

class Bids extends Component {
  renderBids(bids) {
    return bids.length > 0 ? bids.map((b, i) =>
      <Ticket key={i} ticket={b}></Ticket>) : "";
  }

  render() {
    return (
      <div className="tickets">
        <Navbar ></Navbar>
        <div className="container container-2">
          <div className="row justify-content-center align-self-center">
            <h3 className="raleway">My Bids</h3>
          </div>
          <hr />
          <div className="row justify-content-center align-self-center">
            {this.renderBids(this.props.list)}
          </div>
          <hr />
        </div>
      </div>
    );
  }
};

export default withTracker(() => {
  Meteor.subscribe('allBids');
  Meteor.subscribe("allTickets");
  return {
    list: TicketsDB.find({ bidder: Meteor.userId() }).fetch(),
    currentUser: Meteor.user(),
  };
})(Bids);
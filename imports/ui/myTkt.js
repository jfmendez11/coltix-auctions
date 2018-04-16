import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { EventsDB, BidsDB } from "../api/events";
import Navbar from "./Navbar";
import Events from "./events/Events";
import { Accounts } from 'meteor/accounts-base';

import Ticket from './tickets/Ticket';

class myTkt extends Component {

  handleBidSubmit(value, owner, idTkt) {
    let evtId = this.props.list._id;
    Meteor.call('bid.add', owner, idTkt, value, evtId, (err) => {
      if (err) alert(err);
      else alert("New bid");
    });
  }

  renderTickets(tkts){
    return tkts.map((t, i) =>
        <Ticket key={i} ticket={t} handleBidSubmit={this.handleBidSubmit.bind(this)}>  </Ticket>
      );
  }

  render() {
    let x = this.props.list.map((t) => t.tkt);    
    
    return (
      <div className="tickets">
      <Navbar events={this.props.events} onClickSearch={this.props.onClickSearch}></Navbar>
      <div className="container container-2">
        <div className="row justify-content-center align-self-center">
          <h3 className="raleway">My Tickets</h3>
        </div>
        <hr />
        <div className="row justify-content-center align-self-center">
          {this.renderTickets(x)}
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
    list: EventsDB.find().fetch(),
    currentUser: Meteor.user(),
    events: []
  };
})(myTkt);
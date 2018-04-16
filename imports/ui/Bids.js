import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { EventsDB, BidsDB } from "../api/events";
import Navbar from "./Navbar";
import Events from "./events/Events";
import { Accounts } from 'meteor/accounts-base';

// import Tickets from './tickets/Tickets';

class Bids extends Component {
renderBids(){
  return "";
}

  render() {
    console.log(this.props.list);    
    return (
      <div className="tickets">
      <Navbar events={this.props.events} onClickSearch={this.props.onClickSearch}></Navbar>
      <div className="container container-2">
        <div className="row justify-content-center align-self-center">
          <h3 className="raleway">My Bids</h3>
        </div>
        <hr />
        <div className="row justify-content-center align-self-center">
          {this.renderBids()}
        </div>
        <hr />
      </div>
    </div>
    );
  }
};

export default withTracker(() => {
  Meteor.subscribe('allBids');
  Meteor.subscribe("allEvents");
  return {
    list: BidsDB.find().fetch(),
    events: EventsDB.find({"date": { $gte: new Date()}}).fetch(),
    currentUser: Meteor.user(),
  };
})(Bids);
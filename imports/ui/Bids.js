import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { EventsDB, BidsDB } from "../api/events";
import Navbar from "./Navbar";


// import Tickets from './tickets/Tickets';
// optmizar imports inutilizados
class Bids extends Component {

  render() {
    console.log(this.props.list);    
    return (
      <div>
        <div>
          <Navbar events={this.props.events} onClickSearch={this.props.onClickSearch}></Navbar>
        </div>
      </div>
    );
  }
};

export default withTracker(() => {
  Meteor.subscribe('allBids');
  return {
    list: BidsDB.find().fetch(),
    events: EventsDB.find({"date": { $gte: new Date()}}).fetch(),
    currentUser: Meteor.user(),
  };
})(Bids);
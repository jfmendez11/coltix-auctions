import React, { Component } from 'react';
import { withTracker } from "meteor/react-meteor-data";
import { EventsDB, BidsDB } from "../api/events";
import Navbar from "./Navbar";


// import Tickets from './tickets/Tickets';

class myTkt extends Component {

  render() {
    //Tomas Venegas: evitar los console log después de publicado
    return (
      <div>
        <div>
          <Navbar events={this.props.list} onClickSearch={this.props.onClickSearch}></Navbar>
        </div>
      </div>
    );
  }
}
//Tomas Venegas: no seria más organizado llamar esto desde App.js?
export default withTracker(() => {
  Meteor.subscribe('myTickets');
  return {
    list: EventsDB.find({"date": { $gte: new Date()}}).fetch(),
    currentUser: Meteor.user(),
  };
})(myTkt);
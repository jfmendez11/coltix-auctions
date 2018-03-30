import React, { Component } from 'react';
import PropTypes from "prop-types";

import Ticket from "./Tickets";

export default class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  renderTickets() {
    return this.props.tickets.map((t,i) => 
      <Ticket
        key={i}
        ticket={t}
      >
      </Ticket>
    );
  }

  render() {
    return (
      <div className="tickets">
        <div className="container">
            <div className="row justify-content-center align-self-center">
                <h3 className="raleway">Ticket Gallery</h3>
            </div>
            <div className="row justify-content-center align-self-center">
                <a className="btn new-event-btn" href="#" role="button">Add New Ticket</a>
            </div>
            <hr />
            <div className="row justify-content-center align-self-center">
                {this.renderTickets()}
            </div>
        </div>
      </div>
    );
  }
};

Tickets.propTypes = {
  tickets: PropTypes.array.isRequired,
};
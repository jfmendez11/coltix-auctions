import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  renderTicket() {
    return (
        <div>
          <div className="row justify-content-center align-self-center">
             {<img src={this.props.ticket.imgSrc} alt={"Picture for " + this.props.ticket.location} />}
          </div>
          <div className="row justify-content-center align-self-center">
              <h5 className="raleway">Location: {this.props.ticket.location}</h5>
          </div>
          <div className="row justify-content-center align-self-center">
              <h6 className="roboto">Bids: {this.props.ticket.bids}</h6>
          </div>
          <div className="row justify-content-center align-self-center">
              <h6 className="roboto">Current Bid: {this.props.ticket.currentBid}</h6>
          </div>
          <div className="row justify-content-center align-self-center">
              <h6 className="roboto">Buy Now Price: {this.props.ticket.buyNow}</h6>
          </div>
          <div className="row justify-content-center align-self-center">
              <a className="btn event-btn" href="#" role="button">View Details</a>
          </div>
        </div>
    );
}

  render() {
    return (
      <div className="ticket col-md-3">
        {this.renderTicket()}
      </div>
    )
  }
};

Ticket.propTypes = {
  ticket: PropType.object.isRequired,
};

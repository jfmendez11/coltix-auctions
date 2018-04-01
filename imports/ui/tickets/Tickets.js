import React, { Component } from 'react';
import PropTypes from "prop-types";

import Ticket from "./Ticket";
import CreateTicket from "./CreateTicket";

export default class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdd: false,
      description: "",
      increments: 0,
      bids: 0,
      currentBid: 0,
      buyNow: 0,
      dueDate: "",
    };
  }

  componentDidMount() {
    window.scrollTo(0,0);
  }

  handleClick() {
    this.setState({showAdd: true});
  }

  handleClose() {
    this.setState({showAdd: false});
  }

  handleChangeDescription(e) {
    this.setState({description: e.target.value});
  }

  handleChangeIncrements(e) {
    this.setState({increments: e.target.value});
  }

  handleChangeBuyNow(e) {
    this.setState({buyNow: e.target.value});
  }

  handleChangeDate(e) {
    this.setState({dueDate: e.target.value});
  }

  handleSubmitTicket() {
    let newTckt = {
      description: this.state.name,
      increments: this.state.venue,
      bids: 0,
      currentBid: 0,
      buyNow: this.state.buyNow,
      dueDate: new Date(this.state.dueDate),
    }
    this.props.handleSubmitTicket(newTckt);
    this.setState({showAdd: false});
  }

  renderTickets() {
    return this.props.event.tickets.map((t,i) => 
      <Ticket
        key={i}
        ticket={t}
      >
      </Ticket>
    );
  }

  render() {
    let show = this.state.showAdd ? <CreateTicket handleClose={this.handleClose.bind(this)} handleSubmitTicket={this.handleSubmitTicket.bind(this)} handleChangeDescription={this.handleChangeDescription.bind(this)} handleChangeIncrements={this.handleChangeIncrements.bind(this)} handleChangeBuyNow={this.handleChangeBuyNow.bind(this)} handleChangeDate={this.handleChangeDate.bind(this)}></CreateTicket>
    : "";
    let createButton = !this.state.showAdd ? <button className="btn new-event-btn" onClick={this.handleClick.bind(this)}>Add New Ticket</button> : "";
    return (
      <div className="tickets">
        <div className="container">
            <div className="row justify-content-center align-self-center">
                <h3 className="raleway">Ticket Gallery For {this.props.event.name}</h3>
            </div>
            <div className="row justify-content-center align-self-center">
                {createButton}
            </div>
            <div>
              {show}
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
  event: PropTypes.object.isRequired,
  handleSubmitTicket: PropTypes.func.isRequired,
};
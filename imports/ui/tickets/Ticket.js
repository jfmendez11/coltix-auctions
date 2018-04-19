import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      bid: this.props.ticket.currentBid
    };
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  renderTicket() {
    let available = !this.props.ticket.owner == Meteor.userId() ? <input type="number" className="form-control" id="bid-border" placeholder="Enter your bid" onKeyPress={this.handleChange.bind(this)}/>
: "You can't bid on your own ticket";
    return (
        <div>
          <div className="row justify-content-center align-self-center">
            <img className="event-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt0GKPQ8kZxKJ_5Bam2moyLlFj6HAVl3xTpbAT6JUl40U2YCba" width="200" height="200" alt={"Picture for " + this.props.ticket.description} />
          </div>
          <div className="row justify-content-center align-self-center">
              <h5 className="raleway">Location: {this.props.ticket.description}</h5>
          </div>
          <div className="row justify-content-center align-self-center">
              <table className="robto">
                <tbody>
                <tr>
                    <td className="table-cell text-center bold-text">Event</td>
                    <td className="table-cell text-center">{this.props.ticket.evtName}</td>
                  </tr>
                  <tr>
                    <td className="table-cell text-center bold-text">Bids</td>
                    <td className="table-cell text-center">{this.props.ticket.bids}</td>
                  </tr>
                  <tr>
                    <td className="table-cell text-center bold-text">Increments</td>
                    <td className="table-cell text-center">{this.props.ticket.increments}</td>
                  </tr>
                  <tr>
                    <td className="table-cell text-center bold-text">Current Bid</td>
                    <td className="table-cell text-center">{this.props.ticket.currentBid}</td>
                  </tr>
                  <tr>
                    <td className="table-cell text-center bold-text">Buy Now Price</td>
                    <td className="table-cell text-center">{this.props.ticket.buyNow}</td>
                  </tr>
                  <tr>
                    <td className="table-cell text-center bold-text">Time Left</td>
                    <td className="table-cell text-center">{this.state.days}:{this.state.hours}:{this.state.minutes}:{this.state.seconds}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          <div className="row justify-content-center align-self-center">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="dollar">$</span>
                </div>
                  {available}              
                </div>
            </form>
          </div>
        </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    let value = this.state.bid;
    let owner = this.props.ticket.owner;
    let idTkt = this.props.ticket._id;
    this.props.handleBidSubmit(value, owner,idTkt);
  } 

  handleChange(e) {
    if(e.key === "Enter") {
      this.setState({bid: parseInt(e.target.value)});
    }
  }

  componentDidMount() {
    this.setState({currentTime: Date.now()});
    this.startTimer();
  }

  startTimer() {
    setInterval(this.countDown, 1000);
  }

  countDown() {
    let current_date = new Date().getTime();
    let seconds_left = (this.props.ticket.dueDate.getTime() - current_date) / 1000;
  
    days = this.pad( parseInt(seconds_left / 86400) );
    seconds_left = seconds_left % 86400;
       
    hours = this.pad( parseInt(seconds_left / 3600) );
    seconds_left = seconds_left % 3600;
        
    minutes = this.pad( parseInt(seconds_left / 60) );
    seconds = this.pad( parseInt( seconds_left % 60 ) );

    this.setState({days: days, hours: hours, minutes: minutes, seconds: seconds});
  }

  pad(n) {
    return (n < 10 ? '0' : '') + n;
  }

  render() {
    return (
      <div className="ticket col-md-3">
        {this.renderTicket()}
      </div>
    )
  }
};

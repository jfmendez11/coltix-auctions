import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Glyphicon, Button, Modal } from 'react-bootstrap';

import Event from "./Event";
import CreateEvent from "./CreateEvent";

export default class Events extends Component {
  constructor(props) {
      super(props);
      this.state = {
        showAdd: false,
        name: "",
        venue: "",
        date: "",
      };
  }

  renderEvents() {
    return this.props.events.map((e,i) => 
      <Event
        key={i}
        event={e}
        onClickEvent={this.props.onClickEvent}
      >
      </Event>
    );
  }

  handleClick() {
    this.setState({showAdd: true});
  }

  handleClose() {
    this.setState({showAdd: false});
  }

  handleChangeName(e) {
    this.setState({name: e.target.value});
  }

  handleChangeVenue(e) {
    this.setState({venue: e.target.value});
  }

  handleChangeDate(e) {
    this.setState({date: e.target.value});
  }

  handleSubmitEvent() {
    let newEvt = {
      name: this.state.name,
      venue: this.state.venue,
      date: new Date(this.state.date),
      imgSrc: "https://image.flaticon.com/icons/svg/55/55238.svg",
      tickets: [],
    }
    this.props.handleSubmitEvent(newEvt);
    this.setState({showAdd: false});
  }

  render() {
    let show = this.state.showAdd ? <CreateEvent handleClose={this.handleClose.bind(this)} handleSubmitEvent={this.handleSubmitEvent.bind(this)} handleChangeName={this.handleChangeName.bind(this)} handleChangeVenue={this.handleChangeVenue.bind(this)} handleChangeDate={this.handleChangeDate.bind(this)}></CreateEvent>
                               : "";
    let createButton = !this.state.showAdd ? <button className="btn new-event-btn" onClick={this.handleClick.bind(this)}>Create New Event</button> : "";
    return (
      <div className="events">
        <div className="container">
            <div className="row justify-content-center align-self-center">
                <h3 className="raleway">Event Gallery</h3>
            </div>
            <div className="row justify-content-center align-self-center">
              {createButton}
            </div>
            <div>
              {show}
            </div>
            <hr />
            <div className="row justify-content-center align-self-center">
                {this.renderEvents()}
            </div>
        </div>
      </div>
    )
  }
};

Events.propTypes = {
  events: PropTypes.array.isRequired,
  onClickEvent: PropTypes.func.isRequired,
  handleSubmitEvent: PropTypes.func.isRequired,
};

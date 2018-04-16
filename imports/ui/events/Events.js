import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Glyphicon, Button, Modal } from 'react-bootstrap';
import { EventsDB } from "../../api/events";
import Event from "./Event";
import {Tickets} from '../tickets/Tickets';
import Pagination from "react-js-pagination";
import Dropdown from "react-dropdown";

import 'react-dropdown/style.css'

export default class Events extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      min: 0,
      max: 8,
      order: 0,
      showAdd: false,
      name: "",
      venue: "",
      date: "",
    };
  }

  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }

  handleChangeVenue(e) {
    this.setState({ venue: e.target.value });
  }

  handleChangeDate(e) {
    this.setState({ date: e.target.value });
  }

  handleClick() {
    this.setState({ showAdd: true });
  }

  handleClose(e) {
    e.preventDefault();
    this.setState({ showAdd: false });
  }

  handleSubmitEvent(event) {
    event.preventDefault();
    let newEvt = {
      name: this.state.name,
      venue: this.state.venue,
      date: new Date(this.state.date),
      imgSrc: "https://image.flaticon.com/icons/svg/55/55238.svg"
    }
    Meteor.call('events.insert', newEvt.name, newEvt.venue, newEvt.date, newEvt.imgSrc);
    this.setState({ showAdd: false });
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    let max = pageNumber*9 - 1;
    let min = (pageNumber-1)*9;
    console.log(min + " " + max);
    this.setState({min: min, max: max});
  }

  _onSelect(option) {
    console.log(option);
    if (option.value === "Date")
      this.setState({order: 1});
    else if (option.value === "Venue")
      this.setState({order: 2});
    else
      this.setState({order: 0});
    
    return this.props._onSelect(option);
  }

  renderEvents() {
    let currentDate = new Date().getTime();
    let filteredEvents = this.props.events.filter((e, i) => i >= this.state.min && i <= this.state.max && e.date.getTime() - currentDate > 0);
    return filteredEvents.map((e, i) =>
      <Event key={i} event={e}></Event>
    );
  }

  renderNoCreate() {
    return (
      <div className="row justify-content-center align-self-center">
        <button className="btn new-event-btn" onClick={this.handleClick.bind(this)}>Create New Event</button>
      </div>
    );
  }

  renderCreate() {
    return (<form>
      <div className="form-group row">
        <label className="col-2 col-form-label roboto">Event Name</label>
        <div className="col-10">
          <input className="form-control" type="text" placeholder="Event Name" id="example-EvtName-input" onChange={this.handleChangeName.bind(this)} />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-2 col-form-label roboto">Venue</label>
        <div className="col-10">
          <input className="form-control" type="text" placeholder="Venue" id="example-Venue-input" onChange={this.handleChangeVenue.bind(this)} />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-2 col-form-label roboto">Date</label>
        <div className="col-10">
          <input className="form-control" type="date" placeholder="2011-08-19" id="example-date-input" onChange={this.handleChangeDate.bind(this)} />
        </div>
      </div>
      <div className="row justify-content-center align-self-center">
        <button type="submit" className="btn new-event-btn" onClick={this.handleSubmitEvent.bind(this)}>Create</button>
        <button type="button" className="btn btn-close" onClick={this.handleClose.bind(this)}>Close</button>
      </div>
    </form>);
  }

  render() {
    let show = this.props.currentUser ? (this.state.showAdd ? this.renderCreate() : this.renderNoCreate()) : "";
    let options = ["Name", "Date", "Venue"];
    let defaultOption = options[this.state.order];
    let currentDate = new Date().getTime();
    let filteredEvents = this.props.events.filter((e, i) => i >= this.state.min && i <= this.state.max && e.date.getTime() - currentDate > 0);
    return(
      <div className="events">
        <div className="container container-2">
          <div className="row justify-content-center align-self-center">
            <h3 className="raleway">Event Gallery</h3>
          </div>
          <div>
            {show}
          </div>
          <hr />
          <div className="row justify-content-center align-self-center">
              <h6>Sort Events By:</h6> 
              <span><Dropdown options={options} onChange={this._onSelect.bind(this)} value={defaultOption} placeholder={defaultOption} /></span>
            </div>
          <div className="row justify-content-center align-self-center">
            {this.renderEvents()}
          </div>
          <hr />
            <div className="row justify-content-center align-self-center">
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={9}
                totalItemsCount={filteredEvents.length}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange.bind(this)}
                linkClass="pagination-a"
                activeLinkClass="active-a"
              />
            </div>
        </div>
      </div>
    );
  }
};
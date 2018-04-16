import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { Link } from 'react-router-dom'
import { EventsDB, BidsDB } from "../../api/events";
import Ticket from "./Ticket";
import Navbar from "../Navbar";
import Pagination from "react-js-pagination";


class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      min: 0,
      max: 8,
      showAdd: false,
      description: "",
      increments: 0,
      bids: 0,
      currentBid: 0,
      buyNow: 0,
      minPrice: 0,
      dueDate: "",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleClick() {
    this.setState({ showAdd: true });
  }

  handleClose() {
    this.setState({ showAdd: false });
  }

  handleChangeDescription(e) {
    this.setState({ description: e.target.value });
  }

  handleChangeIncrements(e) {
    this.setState({ increments: e.target.value });
  }

  handleChangeBuyNow(e) {
    this.setState({ buyNow: e.target.value });
  }

  handleChangeMinPrice(e) {
    this.setState({ minPrice: e.target.value });
  }

  handleChangeDate(e) {
    this.setState({ dueDate: e.target.value });
  }

  handleAddTicket() {
    let evtId = this.props.match.params.id;
    let section = this.state.description;
    let incs = parseInt(this.state.increments);
    let minPrice = parseInt(this.state.minPrice);
    let buyNow = parseInt(this.state.buyNow);
    let date = new Date(this.state.dueDate);
    Meteor.call('tickets.add', section, incs, buyNow, minPrice, date, evtId, (err) => {
      if (err) alert(err);
      else alert("Ticket added");
    });
    this.setState({ showAdd: false });
  }

  handleBidSubmit(value, owner, idTkt) {
    let evtId = this.props.match.params.id;
    Meteor.call('bid.add', owner, idTkt, value, evtId, (err) => {
      if (err) alert(err);
      else alert("New bid");
    });
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    let max = pageNumber*9 - 1;
    let min = (pageNumber-1)*9;
    console.log(min + " " + max);
    this.setState({min: min, max: max});
  }

  renderTickets() {
    if (this.props.event) {
      let tktListFilter = this.props.event.tickets.filter((t) => t.dueDate.getTime() - new Date().getTime() > 0);
      let tktList = tktListFilter.filter((t, i) => i >= this.state.min && i <= this.state.max);
      return tktList.map((t, i) =>
        <Ticket key={i} ticket={t} handleBidSubmit={this.handleBidSubmit.bind(this)}>  </Ticket>
      );
    }
    else return "";
  }

  renderCreate() {
    return (
      <form>
        <div className="form-group row">
          <label className="col-2 col-form-label roboto">Ticket Description (Section)</label>
          <div className="col-10">
            <input className="form-control" type="text" placeholder="Ticket Description (Section)" id="example-section-input" onChange={this.handleChangeDescription.bind(this)} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label roboto">Base Price</label>
          <div className="col-10">
            <input className="form-control" type="number" placeholder="Base Price" id="example-incs-input" onChange={this.handleChangeMinPrice.bind(this)} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label roboto">Increments</label>
          <div className="col-10">
            <input className="form-control" type="number" placeholder="Increments" id="example-incs-input" onChange={this.handleChangeIncrements.bind(this)} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label roboto">Buy Now Price</label>
          <div className="col-10">
            <input className="form-control" type="number" placeholder="Buy Now Price" id="example-buyNow-input" onChange={this.handleChangeBuyNow.bind(this)} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label roboto">Due Date</label>
          <div className="col-10">
            <input className="form-control" type="date" placeholder="2011-08-19" id="example-date-input" onChange={this.handleChangeDate.bind(this)} />
          </div>
        </div>
        <div className="row justify-content-center align-self-center">
          <button type="submit" className="btn new-event-btn" onClick={this.handleAddTicket.bind(this)}>Add</button>
          <button type="button" className="btn btn-close" onClick={this.handleClose.bind(this)}>Close</button>
        </div>
      </form>
    );
  }

  render() {
    let show = this.state.showAdd ? this.renderCreate() : <button className="btn new-event-btn" onClick={this.handleClick.bind(this)}>Add New Ticket</button>;
    let title = this.props.event ? "Ticket Gallery For " + this.props.event.name : "";
    let tktListFilter = this.props.event.tickets.filter((t) => t.dueDate.getTime() - new Date().getTime() > 0);
    console.log(this.props.event);
    return (
      <div className="tickets">
        <Navbar events={this.props.list} onClickSearch={this.props.onClickSearch}></Navbar>
        <div className="container container-2">
          <div className="row justify-content-center align-self-center">
            <h3 className="raleway">{title}</h3>
          </div>
          <div className="row justify-content-center align-self-center">
            {show}
          </div>
          <hr />
          <div className="row justify-content-center align-self-center">
            {this.renderTickets()}
          </div>
          <hr />
            <div className="row justify-content-center align-self-center">
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={9}
                totalItemsCount={tktListFilter.length}
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

export default withTracker((props) => {
  let evtId = props.match.params.id;
  Meteor.subscribe('oneEvt', evtId);
  Meteor.subscribe('allBids');
  return {
    list: EventsDB.find({"date": { $gte: new Date()}}).fetch(),
    event: EventsDB.find().fetch()[0],
    currentUser: Meteor.user(),
  };
})(Tickets);
import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
        <form>
            <div className="form-group row">
              <label className="col-2 col-form-label roboto">Event Name</label>
              <div className="col-10">
                <input className="form-control" type="text" placeholder="Event Name" id="example-text-input" onChange={this.props.handleChangeName}/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-2 col-form-label roboto">Venue</label>
              <div className="col-10">
                <input className="form-control" type="text" placeholder="Venue" id="example-text-input" onChange={this.props.handleChangeVenue}/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-2 col-form-label roboto">Date</label>
              <div className="col-10">
                <input className="form-control" type="date" placeholder="2011-08-19" id="example-date-input" onChange={this.props.handleChangeDate}/>
              </div>
            </div>
            <div className="row justify-content-center align-self-center">
              <button type="submit" className="btn new-event-btn" onClick={this.props.handleSubmitEvent}>Create</button>
              <button type="button" className="btn btn-close" onClick={this.props.handleClose}>Close</button>
            </div>
        </form>
    );
  }
};

CreateEvent.propTypes = {

};
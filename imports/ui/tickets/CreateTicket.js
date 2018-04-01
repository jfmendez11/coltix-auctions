import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class CreateTicket extends Component {
  render() {
    return (
      <form>
        <div className="form-group row">
            <label className="col-2 col-form-label roboto">Ticket Description</label>
            <div className="col-10">
            <input className="form-control" type="text" placeholder="Ticket Description" id="example-text-input" onChange={this.props.handleChangeDescription}/>
            </div>
        </div>
        <div className="form-group row">
            <label className="col-2 col-form-label roboto">Increments</label>
            <div className="col-10">
            <input className="form-control" type="number" placeholder="Increments" id="example-text-input" onChange={this.props.handleChangeIncrements}/>
            </div>
        </div>
        <div className="form-group row">
            <label className="col-2 col-form-label roboto">Buy Now Price</label>
            <div className="col-10">
            <input className="form-control" type="number" placeholder="Buy Now Price" id="example-text-input" onChange={this.props.handleChangeBuyNow}/>
            </div>
        </div>
        <div className="form-group row">
            <label className="col-2 col-form-label roboto">Due Date</label>
            <div className="col-10">
            <input className="form-control" type="date" placeholder="2011-08-19" id="example-date-input" onChange={this.props.handleChangeDate}/>
            </div>
        </div>
        <div className="row justify-content-center align-self-center">
          <button type="submit" className="btn new-event-btn" onClick={this.props.handleSubmitTicket}>Add</button>
          <button type="button" className="btn btn-close" onClick={this.props.handleClose}>Close</button>
        </div>
      </form>
    )
  }
};

CreateTicket.propTypes = {

};
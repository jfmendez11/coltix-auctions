import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class Event extends Component {
  constructor(props) {
      super(props);
      this.state = {

      };
  }

  renderEvent() {
      return (
          <div>
            <div className="row justify-content-center align-self-center">
               <img className="event-img" src={this.props.event.imgSrc} width="200" height="200" alt={"Picture for " + this.props.event.name} />
            </div>
            <div className="row justify-content-center align-self-center">
                <h5 className="raleway">{this.props.event.name}</h5>
            </div>
            {/*<div className="row justify-content-center align-self-center">
                <h6 className="roboto">Venue: {this.props.event.venue}</h6>
            </div>
            <div className="row justify-content-center align-self-center">
                <h6 className="roboto">Event Date: {this.props.event.date.getDate()+"/"+this.props.event.date.getMonth()+"/"+this.props.event.date.getFullYear()}</h6>
            </div>*/}
            <div className="row justify-content-center align-self-center">
              <table className="robto">
                <tbody>
                  <tr>
                    <td className="table-cell text-center bold-text">Venue</td>
                    <td className="table-cell text-center">{this.props.event.venue}</td>
                  </tr>
                  <tr>
                    <td className="table-cell text-center bold-text">Event Date</td>
                    <td className="table-cell text-center">{this.props.event.date.getDate()+1+"/"+(this.props.event.date.getMonth()+1)+"/"+this.props.event.date.getFullYear()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row justify-content-center align-self-center">
                <button className="btn event-btn" onClick={this.handleClick.bind(this)}>
                    View Ticket Availability
                </button>
            </div>
          </div>
      );
  }

  handleClick() {
      this.props.onClickEvent(this.props.event);
  }

  render() {
    return (
      <div className="event col-md-3">
        {this.renderEvent()}
      </div>
    )
  }
};

Event.propTypes = {
    event: PropTypes.object.isRequired,
    onClickEvent: PropTypes.func.isRequired,
};

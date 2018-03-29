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
               {<img src={this.props.event.imgSrc} alt={"Picture for " + this.props.event.name} />}
            </div>
            <div className="row justify-content-center align-self-center">
                <h5 className="raleway">{this.props.event.name}</h5>
            </div>
            <div className="row justify-content-center align-self-center">
                <h6 className="roboto">Venue: {this.props.event.venue}</h6>
            </div>
            <div className="row justify-content-center align-self-center">
                <h6 className="roboto">Event Date: {this.props.event.date.getDate()+"/"+this.props.event.date.getMonth()+"/"+this.props.event.date.getFullYear()}</h6>
            </div>
          </div>
      );
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
};

import React, { Component } from 'react';
import PropTypes from "prop-types";

import Event from "./Event";

export default class Events extends Component {
  constructor(props) {
      super(props);
      this.state = {

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

  render() {
    return (
      <div className="events">
        <div className="container">
            <div className="row justify-content-center align-self-center">
                <h3 className="raleway">Event Gallery</h3>
            </div>
            <div className="row justify-content-center align-self-center">
                <a className="btn new-event-btn" href="#" role="button">Create New Event</a>
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
};

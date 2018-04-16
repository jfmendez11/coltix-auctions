import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

export default class Event extends Component {

  render() {
    let evtRt = Meteor.user()? "/events/" + this.props.event._id : "/login";
    return (
      <div className="event col-md-3">
        <div className="row justify-content-center align-self-center">
      //Para temas de mostrar algo de ejemplo podrían haber puesto imagenes de eventos reales. Interactuando con la página todos
      //los eventos tienen la misma imagen. Creo que si se tiene una imagen alusiva al evento hace que sea más fácil identificarlo.
          <img className="event-img" src={this.props.event.imgSrc} width="200" height="200" alt={"Picture for " + this.props.event.name} />
        </div>
        <div className="row justify-content-center align-self-center">
          <h5 className="raleway">{this.props.event.name}</h5>
        </div>
        <div className="row justify-content-center align-self-center">
          <table className="robto">
            <tbody>
              <tr>
                <td className="table-cell text-center bold-text">Venue</td>
                <td className="table-cell text-center">{this.props.event.venue}</td>
              </tr>
              <tr>
                <td className="table-cell text-center bold-text">Event Date</td>
                <td className="table-cell text-center">{this.props.event.date.getDate() + 1 + "/" + (this.props.event.date.getMonth() + 1) + "/" + this.props.event.date.getFullYear()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row justify-content-center align-self-center">
          <Link to={evtRt}> <button className="btn event-btn" >View Ticket Availability</button></Link>
        </div>
      </div>
    )
  }
};

import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { EventsDB, BidsDB } from "../api/events";
import Autosuggest from "react-autosuggest";
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      suggestions: [],
    };
  }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');
    const suggestions = this.props.events.filter(event => regex.test(event.name));

    if (suggestions.length === 0) {
      return [
        { isAddNew: true }
      ];
    }
    return suggestions;
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  getSuggestionValue = suggestion => {
    if (suggestion.isAddNew) {
      return this.state.value;
    }
    return suggestion.name;
  };

  renderSuggestion = suggestion => {
    if (suggestion.isAddNew) {
      return (
        <span>
          No results for <strong>{this.state.value}</strong>
        </span>
      );
    }

    return suggestion.name;
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  static contextTypes = {
    router: PropTypes.object
  }

  onSuggestionSelected = (event, { suggestion }) => {
    event.preventDefault();
    if (suggestion.isAddNew) alert("No events with the name " + this.state.value + ". Create a new event with this name");
    else {
      let eventName = this.getSuggestionValue( suggestion );
      let event = {};
      for (let i = 0; i < this.props.events.length; i++) {
        if (this.props.events[i].name === eventName) {
          event = this.props.events[i];
          break;
        }
      }

      if (event.name === eventName) {
        let rt = Meteor.user() ?"/events/"+event._id : "/login";
        this.context.router.history.push(rt);
      }
    }
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search For Events",
      value,
      onChange: this.onChange
    };
    let myT = Meteor.user() ? "/myTickets" : "/login";
    let myB = Meteor.user() ? "/myBids" : "/login";
    return (
      <nav className="navbar navbar-expand-lg dark-blue-bckgrnd raleway fixed-top">
        <div className="container">
          <Link to="/" className="navbar-brand beige-font">
            <img src="https://c1.staticflickr.com/1/864/27589160658_55e0325859_o.png" width="40" height="40" />
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse raleway" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link to="/" className="nav-link beige-font">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link beige-font">Login <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link to={myT} className="nav-link beige-font">My Tickets <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link to={myB} className="nav-link beige-font">My Bids <span className="sr-only">(current)</span></Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                onSuggestionSelected={this.onSuggestionSelected}
                inputProps={inputProps}
              />
            </form>
          </div>
        </div>
      </nav>
    );
  }

};

export default withTracker(() => {
  Meteor.subscribe('allEvents');
  return {
    events: EventsDB.find().fetch()
  };
})(Navbar);
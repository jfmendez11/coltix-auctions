import React, { Component } from 'react';
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";

export default class Navbar extends Component {
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

  onSuggestionSelected = (event, { suggestion }) => {
    event.preventDefault();
    if (suggestion.isAddNew) {
      alert("No events with the name " + this.state.value +". Create a new event with this name");
    } else {
      this.props.onClickSearch(this.state.value);
    }
  };

  onClickSearch() {
    this.props.onClickSearch(this.state.value);
  }

  renderNavbar() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search For Events",
      value,
      onChange: this.onChange
    };
    return (
    <nav className="navbar navbar-expand-lg dark-blue-bckgrnd raleway fixed-top">
        <a className="navbar-brand beige-font" onClick={this.props.homeClick} href="/">
            Coltix Auctions
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse raleway" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <a className="nav-link beige-font" onClick={this.props.homeClick} href="/">Home <span className="sr-only">(current)</span></a>
                </li>
                {/*<li className="nav-item">
                    <a className="nav-link beige-font" href="/#">Register</a>
                </li>*/}
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
    </nav>
    );
  }


  render() {
    return this.renderNavbar();
  }
};

Navbar.propTypes = {
  events: PropTypes.array.isRequired,
  homeClick: PropTypes.func.isRequired,
  onClickSearch: PropTypes.func.isRequired,
};
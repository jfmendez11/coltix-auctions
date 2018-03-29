import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class Navbar extends Component {

  renderNavbar() {
      return (
        <nav className="navbar navbar-expand-lg dark-blue-bckgrnd raleway">
            <a className="navbar-brand beige-font" href="#">Coltix Auctions</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse raleway" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link beige-font" href="#">Home <span className="sr-only">(current)</span></a>
                     </li>
                    <li className="nav-item">
                        <a className="nav-link beige-font" href="#">Register</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled beige-font" href="#">Disabled</a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" />
                    <button className="btn my-2 my-sm-0 search-button" type="submit">Search</button>
                </form>
            </div>
        </nav>
      );
  }


  render() {
    return (
      <div>
        {this.renderNavbar()}
      </div>
    )
  }
};

Navbar.propTypes = {

};
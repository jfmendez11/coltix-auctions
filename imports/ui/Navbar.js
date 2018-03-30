import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class Navbar extends Component {

  renderNavbar() {
      return (
        <nav className="navbar navbar-expand-lg dark-blue-bckgrnd raleway fixed-top">
            <a className="navbar-brand beige-font" href="#">
                {/*<img src="/img/logo2.png" width="30" height="30" className="d-inline-block align-top" alt="Coltix Auctions logo"/>*/}
                Coltix Auctions
            </a>
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
                        <a className="nav-link beige-font" href="#">Disabled</a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search For Events" />
                    <button className="btn my-2 my-sm-0 nav-button" type="submit">Search</button>
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

};
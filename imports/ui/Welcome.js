import React, { Component } from 'react';

export default class Welcome extends Component {
  renderWelcome() {
      return (
          <div>
              <br/>
              <br/>
              <div className="container" id="welcome">
                  <div className="row justify-content-center align-self-center">
                    <h1 className="raleway">Coltix Auctions</h1>
                  </div>
                  <div className="row justify-content-center align-self-center">
                    <img src="img/logo1.png" alt="Coltix Auctions logo"/>
                  </div>
                  <div className="row justify-content-center align-self-center roboto">
                    <h3>Look for tickets available to your favourite events</h3>
                  </div>
              </div>
          </div>
      );
  }
  
  render() {
    return this.renderWelcome();
  }
};

Welcome.propTypes = {

};

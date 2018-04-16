import React, { Component } from 'react';

export default class Welcome extends Component {
  render() {
    return (
      <div>
          <br/>
          <br/>
          <div className="container" id="welcome">
              {/*<div className="row justify-content-center align-self-center">
                <h1 className="raleway">Coltix Auctions</h1>
              </div>*/}
              <div className="row justify-content-center align-self-center">
                <img src="https://c1.staticflickr.com/1/888/26588634107_79102b0d57_b.jpg" width="400" height="275" alt="Coltix Auctions logo"/>
              </div>
              <div className="row justify-content-center align-self-center roboto">
                <h3>Look for tickets available to your favourite events</h3>
              </div>
          </div>
      </div>
    );
  }
};
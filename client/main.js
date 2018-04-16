import { Meteor } from "meteor/meteor";
import React from "react";
import { render } from "react-dom";
// import '../imports/startups/accounts-config.js';
import App from "../imports/ui/App";
import Bids from "../imports/ui/Bids";
import myTkt from "../imports/ui/myTkt";
import Login from "../imports/ui/Login";
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import Tickets from "../imports/ui/tickets/Tickets";

Meteor.startup(() => {
  const browserHistory = createBrowserHistory();

  render(
<Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/myBids" component={Bids}/>
      <Route exact path="/myTickets" component={myTkt}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path='/events/:id' component={Tickets}/>
    </Switch>
  </Router>
    , document.getElementById("render-target"));
});
//Tomas Venegas: falta agregarle al html un tag de leng para mejorar la accesibilidad. Se puede hacer desde aca con un script
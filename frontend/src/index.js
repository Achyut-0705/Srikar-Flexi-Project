import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";

import Home from "Home";
import Analyse from "Analyse";
import Team from "Team";
import ContactUs from "ContactUs";
import Notes from "Notes";
import Login from "Login";
import IndexNavbar from "components/Navbars/IndexNavbar";
import Logout from "Logout";
import Register from "Register";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <IndexNavbar />
    <Switch>
      <Route path="/home" render={(props) => <Home {...props} />} />
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Route path="/logout" render={(props) => <Logout {...props} />} />
      <Route path="/register" render={(props) => <Register {...props} />} />
      <Route path="/notes" render={(props) => <Notes {...props} />} />
      <Route path="/analyse" render={(props) => <Analyse {...props} />} />
      <Route path="/team" render={(props) => <Team {...props} />} />
      <Route path="/contactUs" render={(props) => <ContactUs {...props} />} />
      <Redirect from="/" to="/home" />
    </Switch>
  </BrowserRouter>
);

serviceWorkerRegistration.register();

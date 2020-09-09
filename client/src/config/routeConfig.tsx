import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import back from "../icons/back.png";
import calendar from "../icons/calendar.png";
import Home from "../layout/home";
import NavBar from "../layout/navbar";
import Patterns from "../layout/patterns";
import LoginScreen from "../layout/loginScreen";
import RegisterScreen from "../layout/registerScreen";
import ContentUpload from "../layout/contentUpload";
import withAuthorization from "../layout/withAuth";

const Routing = () => {
  const history = createBrowserHistory();

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/navbar" component={NavBar}></Route>
        <Route path="/patterns" component={Patterns}></Route>
        <Route path="/login" component={LoginScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route
          path="/contentUpload"
          component={withAuthorization(ContentUpload)}
        ></Route>
      </Switch>
    </Router>
  );
};
export default Routing;

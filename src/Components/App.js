import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Landing from './Landing';
import SignUp from './Signup';
import SignIn from './Signin';
import ForgetPassword from './Forgetpassword';
import Home from './Home';
import Account from './Account';
import Navigation from "./Navigation";

// import { firebase } from '../firebase';
import withAuthentication from './withAuthentication';
import * as routes from './../constants/routes';

const App = () =>
  <Router>
    <div>
      <Navigation />
      <Route
        exact path={routes.LANDING}
        component={() => <Landing />}
      />
      <Route
        exact path={routes.SIGN_UP}
        component={() => <SignUp />}
      />
      <Route
        exact path={routes.SIGN_IN}
        component={() => <SignIn />}
      />
      <Route
        exact path={routes.FORGETPASSWORD}
        component={() => <ForgetPassword />}
      />
      <Route
        exact path={routes.HOME}
        component={() => <Home />}
      />
      <Route
        exact path={routes.ACCOUNT}
        component={() => <Account />}
      />
    </div>
  </Router>

export default withAuthentication(App);
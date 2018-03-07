import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './Signup';
import { auth } from '../firebase';
import {
  Row,
  Col,
  Button
} from "reactstrap";
import * as routes from '../constants/routes';
import { PasswordForgetLink } from './Forgetpassword';

const SignIn = ({ history }) =>
  <Row style={{ marginTop: 200 }}>
    <Col lg={{ size: 6, offset: 3 }} md={{ size: 6, offset: 1 }} sm="12" xs="12">
      <h1 style={{ marginBottom: 20 }}>Se connecter</h1>
      <SignInForm history={history} />
      <PasswordForgetLink />
      <SignUpLink />
    </Col>
  </Row>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    console.log("hello", this.props.history.location.pathname)
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div style={{ borderWidth: 1, borderColor: "#000" }}>
        <form onSubmit={this.onSubmit}>
          <input
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email"
          />
          <input
            style={{ marginTop: 10 }}
            value={password}
            onChange={event => this.setState(byPropKey('password', event.target.value))}
            type="password"
            placeholder="Mot de passe"
          />
          <div className="cap-readmore-5" style={{ marginTop: 20 }}>
            <Button disabled={isInvalid} type="submit" className="connect-btn" >
              Envoyer
            </Button>
            {error && <p>{error.message}</p>}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);

export {
  SignInForm,
};
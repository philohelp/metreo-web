import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from './../firebase';
import {
  Row,
  Col,
  Button
} from "reactstrap";

import * as routes from './../constants/routes';

const SignUp = ({ history }) =>
  <Row style={{ marginTop: 200 }}>
    <Col lg={{ size: 6, offset: 3 }} md={{ size: 6, offset: 1 }} sm="12" xs="12">
      <h1 style={{ marginBottom: 20 }}>S'enregistrer</h1>
      <SignUpForm history={history} />
    </Col>
  </Row>

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="Nom"
        />
        <input
          style={{ marginTop: 10 }}
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email"
        />
        <input
          style={{ marginTop: 10 }}
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Mot de passe"
        />
        <input
          style={{ marginTop: 10 }}
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirmez votre mot de passe"
        />
        <div className="cap-readmore-5" style={{ marginTop: 20 }}>
          <Button disabled={isInvalid} type="submit" className="connect-btn" >
            S'enregistrer
          </Button>
          {error && <p>{error.message}</p>}
        </div>
      </form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Pas encore enregistré ?
    {' '}
    <Link to={routes.SIGN_UP}>S'enregistrer</Link>
  </p>

export default withRouter(SignUp);

export {
  SignUpForm,
  SignUpLink,
};
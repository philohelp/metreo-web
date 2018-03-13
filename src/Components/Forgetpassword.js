import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from 'semantic-ui-react'

import { auth } from '../firebase';

const ForgetPassword = () =>
  <Grid columns={3} divided>
    <Grid.Row style={{ marginTop: 200 }}>
      <Grid.Column lg={{ size: 6, offset: 3 }} md={{ size: 6, offset: 1 }} sm="12" xs="12">
        <h1 style={{ marginBottom: 20 }}>Mot de passe oublié</h1>
        <PasswordForgetForm />
      </Grid.Column>
    </Grid.Row>
  </Grid>


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={this.state.email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email"
        />
        <div className="cap-readmore-5" style={{ marginTop: 20 }}>
          <Button disabled={isInvalid} type="submit">
            Réinitialiser mon mot de passe
        </Button>
        </div>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to="/mdp-rec">Mot de passe oublié ?</Link>
  </p>

export default ForgetPassword;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
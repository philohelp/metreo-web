import React from 'react';
import PropTypes from 'prop-types';

import withAuthorization from './withAuthorization';

import { PasswordForgetForm } from './Forgetpassword';
import PasswordChangeForm from './Changepassword';

import { Grid } from 'semantic-ui-react'

const AccountPage = (props, { authUser }) =>
  <Grid columns={3} divided>
    <Grid.Row style={{ marginTop: 200 }}>
      <Grid.Column lg={{ size: 6, offset: 3 }} md={{ size: 6, offset: 1 }} sm="12" xs="12">
        <h1 style={{ marginBottom: 20 }}>Mon profil</h1>
        <div style={{ marginBottom: 20 }}>
          <PasswordForgetForm />
        </div>
        <div style={{ marginBottom: 20 }}>
          <PasswordChangeForm />
        </div>
      </Grid.Column>
    </Grid.Row>
  </Grid>

AccountPage.contextTypes = {
  authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
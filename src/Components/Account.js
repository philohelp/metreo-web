import React from 'react';
import PropTypes from 'prop-types';

import { PasswordForgetForm } from './Forgetpassword';
import PasswordChangeForm from './Changepassword';

import {
  Col, Row
} from 'reactstrap';

const AccountPage = (props, { authUser }) =>
  <Row style={{ marginTop: 200 }}>
    <Col lg={{ size: 6, offset: 3 }} md={{ size: 6, offset: 1 }} sm="12" xs="12">
      <h1 style={{ marginBottom: 20 }}>Mon profil</h1>
      <div style={{ marginBottom: 20 }}>
        <PasswordForgetForm />
      </div>
      <div style={{ marginBottom: 20 }}>
        <PasswordChangeForm />
      </div>
    </Col>
  </Row>

AccountPage.contextTypes = {
  authUser: PropTypes.object,
};

export default AccountPage;
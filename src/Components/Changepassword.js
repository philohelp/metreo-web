import React, { Component } from 'react';

import { auth } from '../firebase';

import { Button } from 'semantic-ui-react'

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const { passwordOne } = this.state;

        auth.doPasswordUpdate(passwordOne)
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
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    value={passwordOne}
                    onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                    type="password"
                    placeholder="Nouveau mot de passe"
                />
                <input
                    value={passwordTwo}
                    onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                    type="password"
                    placeholder="Confirmez votre mot de passe"
                />
                <div className="cap-readmore-5" style={{ marginTop: 20 }}>
                    <Button disabled={isInvalid} type="submit" className="connect-btn" >
                        Changer mon mot de passe
                    </Button>
                    {error && <p>{error.message}</p>}
                </div>

            </form>
        );
    }
}

export default PasswordChangeForm;
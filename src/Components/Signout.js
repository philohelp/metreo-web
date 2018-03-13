import React from 'react';

import { auth } from './../firebase';

import { Menu } from 'semantic-ui-react';

const SignOutButton = () =>
    <Menu.Item>
        <div className="cap-readmore-5">
            <div onClick={auth.doSignOut} style={{ fontSize: 14 }}>Se déconnecter</div>
        </div>
    </Menu.Item>

export default SignOutButton;
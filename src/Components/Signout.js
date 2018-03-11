import React from 'react';
import {
    NavItem,
    NavLink
} from 'reactstrap';

import { auth } from './../firebase';

const SignOutButton = () =>
    <NavItem>
        <div className="cap-readmore-5">
            <NavLink onClick={auth.doSignOut} >Se déconnecter</NavLink>
        </div>
    </NavItem>

export default SignOutButton;
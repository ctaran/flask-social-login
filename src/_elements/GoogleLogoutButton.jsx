import React from 'react';
import { GoogleLogout } from 'react-google-login';

function GoogleLogoutButton(props) {
    const logout = () => {
        props.onClick();
    };

    return (
        <div>
            <GoogleLogout clientId={props.clientID} buttonText="Logout" onLogoutSuccess={logout}/>
        </div>
    );
}

export default GoogleLogoutButton;
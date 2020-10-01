import React from 'react';
import { GoogleLogout } from 'react-google-login';

const googleClientID = "133413789921-krktqeelao35acttdqqd0gp0sp6q56kp.apps.googleusercontent.com";

function GoogleLogoutButton(props) {
    const logout = () => {
        props.onClick();
    };

    return (
        <div>
            <GoogleLogout clientId={googleClientID} buttonText="Logout" onLogoutSuccess={logout}/>
        </div>
    );
}

export default GoogleLogoutButton;
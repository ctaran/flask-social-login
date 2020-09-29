import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { userOrigins } from '../_services';

function GoogleLoginButton(props) {

    const onSuccess = (response) => {
        props.onSuccess(response.tokenId, userOrigins.GOOGLE);
    };

    const onFailure = (res) => {
        alert("Google login failed");
    };

    return (
        <div style={{ marginTop:'10px'}} >
            <GoogleLogin
                clientId={props.clientID}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
            />
        </div>
    );
}

export default GoogleLoginButton;
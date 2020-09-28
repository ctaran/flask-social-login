import React from 'react';
import LoginUser from '../_components/LoginUser';
import { authenticationService } from '../_services';

class Login extends React.Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push('/');
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleExternalLogin = this.handleExternalLogin.bind(this);
    }

    handleLogin(username, password) {
        authenticationService.login(username, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                }
            );
    }

    handleExternalLogin(access_token) {
        authenticationService.loginExternal(access_token)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => {
                    alert('Login with GOOGLE failed - ' + error);
                }
            );
    }

    render() {
        return (
            <LoginUser loginClick={this.handleLogin} onGoogleLoginSuccess={this.handleExternalLogin}/>
        )
    }
}

export default Login; 
import React from 'react';
import LoginUser from '../_components/LoginUser';
import { authenticationService, userRoles } from '../_services';

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
                    if (user.role == userRoles.ADMIN) {
                        const { from } = { from: { pathname: "/admin" } };
                        this.props.history.push(from);
                    }
                    else {
                        const { from } = this.props.location.state || { from: { pathname: "/" } };
                        this.props.history.push(from);
                    }
                }
            );
    }

    handleExternalLogin(access_token, origin) {
        authenticationService.loginExternal(access_token, origin)
            .then(
                user => {
                    if (user.role == userRoles.ADMIN) {
                        const { from } = { from: { pathname: "/admin" } };
                        this.props.history.push(from);
                    }
                    else {
                        const { from } = this.props.location.state || { from: { pathname: "/" } };
                        this.props.history.push(from);
                    }
                },
                error => {
                    alert('Login with ' + origin + ' failed - ' + error);
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
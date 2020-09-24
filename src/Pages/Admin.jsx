import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { authenticationService } from '../_services';

class Admin extends Component {
    render() {
        return (
            authenticationService && authenticationService.currentUserValue &&
            <Container>
                Admin {authenticationService.currentUserValue.name}'s home page
            </Container>
        );
    }
}

export default Admin;
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { authenticationService } from '../_services';

class Home extends Component {
    render() {
        return (
            authenticationService && authenticationService.currentUserValue &&
            <Container>
                User {authenticationService.currentUserValue.name}'s home page
            </Container>
        );
    }
}

export default Home;
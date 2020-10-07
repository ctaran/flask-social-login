import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import UserCard from '../_components/UserCard';
import { authenticationService } from '../_services';

class Admin extends Component {
    render() {
        const user = authenticationService && authenticationService.currentUserValue;

        return (
            user &&
            <Container>
                <UserCard user={user}/>
            </Container>
        );
    }
}

export default Admin;
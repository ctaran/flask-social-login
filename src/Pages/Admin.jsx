import React, { Component } from 'react';
import { Card, Container, FormTextArea, Icon, Image } from 'semantic-ui-react';
import { authenticationService } from '../_services';

class Admin extends Component {
    render() {
        const user = authenticationService && authenticationService.currentUserValue;

        return (
            user &&
            <Container>
                <Card>
                    <Image src={`../_images/user${user.id}.png`} wrapped ui={false} />
                    <Card.Content>
                    <Card.Header>{user.name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{user.email}</span>
                    </Card.Meta>
                    <Card.Description>
                        {user.name} has the {user.role} role
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        {user.name} is coming from {user.origin}
                    </a>
                    </Card.Content>
                </Card>
            </Container>
        );
    }
}

export default Admin;
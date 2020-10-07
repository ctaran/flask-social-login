import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

export default function UserCard(props) {
    return (
        <Card>
            <Image src={require(`../_images/user${props.user.id}.png`)} wrapped ui={false} />
            <Card.Content>
            <Card.Header>{props.user.name}</Card.Header>
            <Card.Meta>
                <span className='date'>{props.user.email}</span>
            </Card.Meta>
            <Card.Description>
                {props.user.name} has the {props.user.role} role
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <a>
                <Icon name='user' />
                {props.user.name} is coming from {props.user.origin}
            </a>
            </Card.Content>
        </Card>
    );
}
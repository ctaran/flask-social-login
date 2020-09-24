import React, {Component} from 'react';

import { authenticationService } from '../_services';
import RegisterUser from '../_components/RegisterUser';

class Register extends Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <RegisterUser/>
        )
    }
}

export default Register;
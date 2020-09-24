import React from 'react'
import { userService } from '../_services';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Segment, Message } from 'semantic-ui-react';

class RegisterUser extends React.Component {
    render() {
        let initialVals = 
            {
                name: '',
                password: '',
                email: '',
            };

        return (
            <>
                <div className="col"></div>
                <div className="col-5">
                    <h2>Register</h2>
                    <Formik
                        initialValues={initialVals}
                        enableReinitialize
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required('Username is required'),
                            password: Yup.string().required('Password is required'),
                            email: Yup.string().required('Email is required'),
                        })}
                        onSubmit={({ name, password, email }, { setStatus, setSubmitting, resetForm }) => {
                            setStatus();
                            userService.registerUser(name, password, email)
                                .then((user) => {
                                    setSubmitting(false);
                                    setStatus();
                                    resetForm();
                                    alert("User " + user.name + " created successfully");
                                },
                                    error => {
                                        setSubmitting(false);
                                        setStatus(error);
                                        alert("User creation failed - " + error);
                                        console.log(error);
                                    }
                                );
                        }}
                        render={({ errors, status, touched, isSubmitting }) => (
                            <Segment>
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <Button type="submit" color="blue" size="small" disabled={isSubmitting}>Register</Button>
                                        {isSubmitting &&
                                            <img alt="No img" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                    </div>
                                    {status &&
                                        <div className={'alert alert-danger'}>{status}</div>
                                    }
                                </Form>
                            </Segment>
                        )}
                    />
                    <Message>
                        Already have an account? <a href='/Login'>Log in</a>
                    </Message>
                </div>
                <div className="col"></div>
            </>
        );
    }
}

export default RegisterUser
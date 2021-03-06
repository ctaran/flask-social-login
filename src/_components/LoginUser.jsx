import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Message } from 'semantic-ui-react';
import GoogleLoginButton from '../_elements/GoogleLoginButton';

class LoginUser extends React.Component {
    render() {
        const googleClientID = "133413789921-krktqeelao35acttdqqd0gp0sp6q56kp.apps.googleusercontent.com";
        
        return (
            <>
                <div className="col"></div>
                <div className="col-5">
                    <div className="alert alert-info">
                        <strong>User</strong> - U: user P: user<br />
                        <strong>Administrator</strong> - U: admin P: admin<br />
                    </div>
                    <h2>Login</h2>
                    <Formik
                        initialValues={{
                            username: '',
                            password: ''
                        }}
                        validationSchema={Yup.object().shape({
                            username: Yup.string().required('Username is required'),
                            password: Yup.string().required('Password is required')
                        })}
                        onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                            this.props.loginClick(username, password)
                                .then(
                                    user => {
                                        setSubmitting(false);
                                    },
                                    error => {
                                        setSubmitting(false);
                                        setStatus(error);
                                    }
                                );
                        }}
                    >
                        {({ errors, status, touched, isSubmitting }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <Field name="username" placeholder="User name or email address" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                    <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field name="password" placeholder="Password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                                    {isSubmitting &&
                                        <img alt="No img" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                </div>
                                {status &&
                                    <div className={'alert alert-danger'}>{status}</div>
                                }
                            </Form>
                        )}
                    </Formik>
                    <GoogleLoginButton clientID={googleClientID} onSuccess={this.props.onGoogleLoginSuccess} />
                    <Message>
                        Don't have an account yet? <a href='/register'>Sign Up</a>
                    </Message>
                </div>
                <div className="col"></div>
            </>
        );
    }
}

export default LoginUser
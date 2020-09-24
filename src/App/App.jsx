import React from 'react';
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import { history } from '../_helpers';
import { authenticationService, userRoles } from '../_services';
import { PrivateRoute } from '../_elements/PrivateRoute';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Admin from '../Pages/Admin';
import Home from '../Pages/Home';

class App extends React.Component {
  constructor(props) {
    super();

    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({
      currentUser: x,
    }));
  }

  logout() {
    authenticationService.logout();
    history.push('/login');
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Router history={history}>
          <div className="container">
            {currentUser &&
              <nav className="navbar navbar-light" style={{ background: "#e3f2fd" }}>
                <span className="navbar-brand mb-0 h0"><b>Social Login</b></span>
                <div className="navbar-nav ml-auto">
                  <a href="/" style={{ cursor: 'pointer' }} onClick={this.logout} className="nav-item nav-link">Logout ({currentUser.name})</a>
                </div>
              </nav>
            }
            <div className="jumbotron bg-white mt-4">
              <div className="container">
                <div className="row">
                    <Switch>
                      <PrivateRoute exact path="/" component={Home} />
                      <PrivateRoute path="/admin" roles={[userRoles.ADMIN]} component={Admin} />
                      <Route path="/login" component={Login} />
                      <Route path="/register" component={Register} />
                      <Route render={() => <h1>Page not found</h1>} />
                    </Switch>
                </div>
              </div>
            </div>
          </div>
        </Router>
    );
  }
}

export default App;

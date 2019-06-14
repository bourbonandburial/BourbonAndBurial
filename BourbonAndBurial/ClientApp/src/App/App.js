import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import connection from '../helpers/data/connection';
import authRequests from '../helpers/data/authRequests';
import customerRequests from '../helpers/data/customerRequests';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Home from '../components/pages/Home/Home';
import Auth from '../components/pages/Auth/Auth';
import ALaCarte from '../components/pages/ALaCarte/ALaCarte';
import './App.scss';


const PublicRoute = ({ component: Component, authed, ...rest }) => {
  let routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  let routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    pendingUser: true,
    customers: [],
  }

  componentDidMount() {
    connection();

    this.getCustomers();

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });
        authRequests.getCurrentUserJwt();
      } else {
        this.setState({
          authed: false,
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  getCustomers = () => {
    customerRequests.getAllCustomers().then((results) => {
      const data = results.data;
      this.setState({ customers: data });
    }).catch(err => console.error('error in getAllCustomers', err));
  }

  render() {
    const { authed, pendingUser, customers } = this.state;

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (pendingUser) {
      return null;
    }

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed} logoutClickEvent={logoutClickEvent} customers={customers} />
            <Switch>
              <PublicRoute path='/auth' component={Auth} authed={authed} />
              <PrivateRoute path='/' exact component={Home} authed={authed} />
              <PrivateRoute path='/home' component={Home} authed={authed} />
              <PrivateRoute path='/ALaCarte' component={ALaCarte} authed={authed} />
              <PrivateRoute path='/home' component={Home} authed={authed} />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

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
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Home from '../components/pages/Home/Home';
import Auth from '../components/pages/Auth/Auth';
import ALaCarte from '../components/pages/ALaCarte/ALaCarte';
import productRequests from '../helpers/data/productRequests';
import PropTypes from 'prop-types';
import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  let routeChecker = props => (authed === false
    ? (<Component {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  let routeChecker = props => (authed === true
    ? (<Component {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  state = {
    authed: false,
    pendingUser: true,
    packageOne: [],
    packageTwo: [],
    packageThree: []
  }

  displayPackageOneProducts = () => {
    productRequests.getAllCremationProducts()
    .then((data) => {
        this.setState({ packageOne: data });
    }).catch(err => console.error('error getting products', err));
}

  displayPackageTwoProducts = () => {
    productRequests.getAllBurialProducts()
    .then((data) => {
        this.setState({ packageTwo: data });
    }).catch(err => console.error('error getting products', err));
  }

  displayPackageThreeProducts = () => {
    productRequests.getAllMausoleumProducts()
    .then((data) => {
        this.setState({ packageThree: data });
    }).catch(err => console.error('error getting products', err));
}

  componentDidMount() {
    connection();
    this.displayPackageOneProducts();
    this.displayPackageTwoProducts();
    this.displayPackageThreeProducts();

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

  setSelectedPackage() {
    // this.setState({selectedPackage: package});
    console.log("this button works");
    this.props.history.push('/ALaCarte');
    
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  render() {
    const { authed, pendingUser } = this.state;

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
            <MyNavbar authed={authed} logoutClickEvent={logoutClickEvent} />
            <Switch>
              <PublicRoute path='/auth' component={Auth} authed={authed} />
              <PrivateRoute path='/' exact component={Home} authed={authed} />
              <PrivateRoute path='/home' component={Home} authed={authed} setSelectedPackage={this.setSelectedPackage}/>
              <PrivateRoute path='/ALaCarte' component={ALaCarte} authed={authed}  />
              <PrivateRoute path='/home' component={Home} authed={authed} />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

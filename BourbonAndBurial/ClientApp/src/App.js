import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter, Redirect, Switch
} from 'react-router-dom';

import { Route } from 'react-router';
import { Home } from './components/Home';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
    const routeChecker = props => (authed === false
        ? (<Component {...props} />)
        : (<Redirect to={{ pathname: '/fleet', state: { from: props.location } }} />));
    return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
    const routeChecker = props => (authed === true
        ? (<Component {...props} />)
        : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
    return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
    state = {
        authed: false,
    }

    componentDidMount() {
        this.removeListener = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ authed: true });
            } else {
                this.setState({ authed: false });
            }
        });
    }

    componentWillUnmount() {
        this.removeListener();
    }

    runAway = () => {
        this.setState({ authed: false });
    }

    render() {
    return (
        <div className="App">
            <BrowserRouter>
                <div authed={this.state.authed}>
                    {/* <Navbar
                        authed={this.state.authed}
                        runAway={this.runAway}
                    /> */}
                    <div className="container">
                        <div className="row">
                            <Switch>
                                <Route path="/" exact component={Home} />
                                {/* <PrivateRoute
                                    path="/fetchData"
                                    authed={this.state.authed}
                                    component={FetchData}
                                /> */}
                            </Switch>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
    }
}

export default App;
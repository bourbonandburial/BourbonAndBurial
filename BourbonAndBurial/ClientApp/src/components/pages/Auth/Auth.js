import React from 'react';
import './Auth.scss';
import authRequests from '../../../helpers/data/authRequests';
import {
  NavLink,
} from 'reactstrap';

class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.loginUser().then(() => {
      this.props.history.push('/home');
    }).catch(err => console.error('error in auth', err));
  }

  render() {
    return (
      <div className='Auth'>
              {/* <NavLink className="text-muted" onClick={this.authenticateUser}>Login</NavLink> */}
            <div className=" grave parallax">
              
              {/* <img className="grave parallax" src="https://github.com/ke4tri/Images/blob/master/graveyard.jpg?raw=true" alt="Drone" width="1500" height="400" /> */}
              
            </div>
            
      </div>
    );
  }
}

export default Auth;

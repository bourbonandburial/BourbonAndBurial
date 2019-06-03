import React from 'react';
import './Auth.scss';
import authRequests from '../../../helpers/data/authRequests';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import googleButton from './images/googlebutton.png';

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
              <NavLink className="text-muted" onClick={this.authenticateUser}>Login</NavLink>
        {/* <button className='btn btn-outline-light' onClick={this.authenticateUser}>
          <img src={googleButton} alt="google login button" />
        </button> */}
      </div>
    );
  }
}

export default Auth;

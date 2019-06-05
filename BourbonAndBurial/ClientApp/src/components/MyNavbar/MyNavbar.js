import React from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavLink,
} from 'reactstrap';
import authRequests from '../../helpers/data/authRequests';
import './MyNavbar.scss';


class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
  }
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.loginUser().then(() => {
      this.props.history.push('/home');
    }).catch(err => console.error('error in auth', err));
  }

  state = {
    isOpen: false,
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isAuthed, logoutClickEvent } = this.props;
   
      if (isAuthed) {
        return (
          <Navbar color="link" dark expand="md">
            <NavbarBrand className="text-muted" href="/home">Bourbon & Burial</NavbarBrand>
            <NavbarToggler onClick={e => this.toggle(e)} />
            <NavLink className="text-muted" onClick={logoutClickEvent}>Logout</NavLink>
          </Navbar>
        );
      }
    
    return (

      <div className="my-navbar">
        <Navbar color="link" dark expand="md">
          <NavbarBrand className="text-muted" href="/home">Bourbon & Burial</NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} />
              <NavLink className="text-muted" onClick={this.authenticateUser}>Login</NavLink>

        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
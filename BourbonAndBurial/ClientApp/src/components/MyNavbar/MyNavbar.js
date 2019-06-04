import React from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavLink,
} from 'reactstrap';
import Auth from '../../components/pages/Auth/Auth';
import './MyNavbar.scss';
import customerRequests from '../../helpers/data/customerRequests';
import authRequests from '../../helpers/data/authRequests';
import CustomerProfile from '../CustomerProfile/CustomerProfile';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
  }

  state = {
    isOpen: false,
    firebaseUser: {},
    customerObject: {},
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }



  render() {
    const { authed, logoutClickEvent } = this.props;

    if (authed) {
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
          {/* <Collapse isOpen={this.state.isOpen} navbar> */}
            <Auth authed={authed} />
          {/* </Collapse> */}
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
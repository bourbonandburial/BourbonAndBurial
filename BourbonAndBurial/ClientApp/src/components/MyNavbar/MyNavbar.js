import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Collapse,
  NavLink,
  Nav,
  NavItem,
} from 'reactstrap';
import './MyNavbar.scss';


class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
  }

  state = {
    isOpen: false,
    customers: [],
    firebaseUser: {},
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  componentWillMount() {
  }

  render() {
    const { authed, logoutClickEvent } = this.props;

    const buildNavbar = () => {
      if (authed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={logoutClickEvent}>Logout</NavLink>
            </NavItem>
          </Nav>
        );      
      }
      return (
        <Nav className="ml-auto" navbar />
      );
    };

    return (
      <div className="my-navbar">
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={RRNavLink} to="/home">Bourbon & Burial</NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
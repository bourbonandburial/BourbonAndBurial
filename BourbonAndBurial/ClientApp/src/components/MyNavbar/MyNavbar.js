import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Collapse,
  NavLink,
  Nav,
  NavItem,
} from 'reactstrap';
import customerRequests from '../../helpers/data/customerRequests';
import ValidCustomer from '../ValidCustomer/ValidCustomer';
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
    this.getCustomers();
  }

  getCustomers = () => {
    customerRequests.getAllCustomers().then((results) => {
      const data = results.data;
      this.setState({ customers: data });
    }).catch(err => console.error('error in getAllCustomers', err));
  }

  render() {
    const { customers } = this.state;
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
        <Nav className="ml-auto" navbar>
          <NavItem>
            <ValidCustomer customers={customers} getCustomers={this.getCustomers} />
          </NavItem>
        </Nav>
      );
    };

    return (
      <div className="my-navbar">
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={RRNavLink} to="/home">Bourbon & Burial</NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
            {/* <NavLink className="text-muted" onClick={this.authenticateUser}>Login</NavLink> */}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
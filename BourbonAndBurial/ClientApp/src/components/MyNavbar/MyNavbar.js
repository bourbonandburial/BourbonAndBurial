import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import './MyNavbar.scss';


class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
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
    const buildNavbar = () => {
      if (isAuthed) {
        return (
        <Nav className="ml-auto" navbar>
          <NavItem className="nav-item">
            <NavLink onClick={logoutClickEvent}>Logout</NavLink>
          </NavItem>
        </Nav>
        );
      }
      return <Nav className="ml-auto" navbar />;
    };

    return (
      <div className="my-navbar mb-5">
       <Navbar color="dark" dark expand="md" className="fixed-top">
          <NavbarBrand href="/">Bourbon and Burial</NavbarBrand>
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

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
import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
    loginClickEvent: PropTypes.func
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
    const { authed, logoutClickEvent, loginClickEvent } = this.props;
    const buildNavbar = () => {
      if (authed) {
        return (
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink onClick={logoutClickEvent}>Logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      return (
        <Nav className='ml-auto' navbar>
          <NavItem>
            <NavLink onClick={loginClickEvent}>Login</NavLink>
          </NavItem>
        </Nav>
      );
    };

    return (
      <div className="my-navbar">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/home">Bourbon & Burial</NavbarBrand>
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
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
import Auth from '../../components/pages/Auth/Auth';
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
          {/* <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse> */}
              <Auth />
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
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
import customerRequests from '../../helpers/data/customerRequests';
import authRequests from '../../helpers/data/authRequests';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
    loginClickEvent: PropTypes.func
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

  componentDidMount() {
    const fbUser = authRequests.getCurrentUser();
    customerRequests.getSingleCustomer(fbUser.uid).then((currentCustomer) => {
      this.setState({
        firebaseUser: fbUser.providerData[0],
        customerObject: currentCustomer,
      });
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
          <Collapse isOpen={this.state.isOpen} navbar>
            <Auth />
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
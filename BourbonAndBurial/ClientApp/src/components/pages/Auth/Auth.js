import React from 'react';
import ValidCustomer from '../../ValidCustomer/ValidCustomer';
import customerRequests from '../../../helpers/data/customerRequests';

import './Auth.scss';
import PropTypes from 'prop-types';

class Auth extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    logoutClickEven: PropTypes.func,
  }

  state = {
    isOpen: false,
    customers: [],
    firebaseUser: {},
    customerObject: {},
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

    return (
      <div className='Auth'>
          <div className="grave parallax"></div>
          {/* <button type="button" class="btn btn-primary">Primary</button> */}
          <ValidCustomer calssName="validCust" customers={customers} getCustomers={this.getCustomers} />
      </div>
    );
  }
}

export default Auth;

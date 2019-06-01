import React from 'react';
import './Auth.scss';
import authRequests from '../../../helpers/data/authRequests';

import googleButton from './images/googlebutton.png';
import customerRequests from '../../../helpers/data/customerRequests';


const defaultCustomer = {
  customerId: 0,
  displayName: '',
  email: '',
  firebaseId: '',
  isActive: true,
}

class Auth extends React.Component {
  state = {
    customers: [],
    currentCustomer: [],
    newCustomer: defaultCustomer
  }

  customerValidation = () => {
    const customers = this.state.customers;
    const uid = authRequests.getCurrentUid();
    const currentCustomer = customers.filter(customer => customer.firebaseId === uid);
    if (currentCustomer.length !== 0) {
      this.props.history.push('/home');
    } else {
      const newCustomer = { ...this.state.newCustomer };
      newCustomer.displayName = authRequests.getDisplayName();
      newCustomer.email = authRequests.getEmail();
      newCustomer.firebaseId = authRequests.getUid();
      this.setState({ newCustomer: defaultCustomer });
    }
  }

  getCustomers = () => {
    customerRequests.getAllCustomers().then(results => {
      const data = results.data;
      this.setState({ customers: data });
    });
  }

  addCustomer = (newCustomer) => {
    customerRequests.createCustomer(newCustomer).then(() => {
      this.getCustomers();
    });
  }

  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.loginUser().then(() => {
      this.props.history.push('/home');
    }).catch(err => console.error('error in auth', err));
  }

  render() {
    return (
      <div className='Auth'>
        <button className='btn btn-outline-light' onClick={this.authenticateUser}>
          <img src={googleButton} alt="google login button" />
        </button>
      </div>
    );
  }
}

export default Auth;

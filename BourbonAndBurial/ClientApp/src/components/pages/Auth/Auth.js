import React from 'react';
import './Auth.scss';
import authRequests from '../../../helpers/data/authRequests';

import googleButton from './images/googlebutton.png';
import customerRequests from '../../../helpers/data/customerRequests';

const defaultCustomer = {
  displayName: '',
  email: '',
  firebaseId: '',
  isActive: true,
}

class Auth extends React.Component {
  state = {
    newCustomer: defaultCustomer,
  }

  getAllCustomers = () => {
    customerRequests.getAllCustomers().then((results) => {
      const customers = results.data;
      this.customerValidation(customers);
    }).catch(err => console.error('error in getAllCustomers', err));
  }

  // checking to see if user is already in db.
  // if so, go to homepage. if not, add user to db and then go to home
  customerValidation = (customers) => {
    const uid = authRequests.getUid();
    //if there are no users
    if (customers !== undefined || customers.length !== 0) {
      const currentCustomer = customers.filter(customerObject => customerObject.firebaseId === uid);
      if (currentCustomer.length === 0) {
        this.createNewCustomer();
      }
    }
  }

  createNewCustomer = () => {
    const newCustomer = { ...this.state.newCustomer };
    newCustomer.displayName = authRequests.getDisplayName();
    newCustomer.email = authRequests.getEmail();
    newCustomer.firebaseId = authRequests.getUid();
    this.setState({ newCustomer: defaultCustomer });
    this.addCustomer(newCustomer);
  }

  addCustomer = (newCustomer) => {
    customerRequests.createCustomer(newCustomer).then(() => {
    }).catch(err => console.error('error in adding customer', err));
  }

  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.googleAuth().then(() => {
      this.getAllCustomers();
      this.props.history.push('/home');
    }).catch(err => console.error('error in authenticateUser function', err));
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

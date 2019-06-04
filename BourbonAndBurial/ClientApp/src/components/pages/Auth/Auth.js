import React from 'react';
import PropTypes from 'prop-types';
import './Auth.scss';
import authRequests from '../../../helpers/data/authRequests';

import googleButton from './images/googlebutton.png';
import customerRequests from '../../../helpers/data/customerRequests';

const defaultCustomer = {
  // customerId: 0,
  displayName: '',
  email: '',
  firebaseId: '',
  isActive: true,
}

class Auth extends React.Component {
  static propTypes = {
    customers: PropTypes.array,
    getCustomers: PropTypes.func,
  }

  state = {
    // customers: [],
    // currentCustomer: {},
    newCustomer: defaultCustomer,
  }

  getAllCustomers = () => {
    customerRequests.getAllCustomers().then(results => {
      const data = results.data;
      console.log(data);
      return data;
      //this.setState({ customers: data });
    });
  }

  // checking to see if user is already in db.
  // if so, go to homepage. if not, add user to db and then go to home
  customerValidation = () => {
    // const customers = this.getCustomers();
    // const customers = {...this.state.customers};
    const customers = [ ...this.props.customers ];
    const uid = authRequests.getUid();
    if (customers !== undefined || customers.length !== 0) {
      const currentCustomer = customers.filter(customerObject => customerObject.firebaseId === uid);
      if (currentCustomer.length === 0) {
        const customerToAdd = { ...this.state.newCustomer };
        customerToAdd.displayName = authRequests.getDisplayName();
        customerToAdd.email = authRequests.getEmail();
        customerToAdd.firebaseId = authRequests.getUid();
        this.setState({ newCustomer: customerToAdd });
        console.log(this.state.newCustomer);
        console.log(customerToAdd);
        this.addCustomer(customerToAdd);
      }
    }
    // const currentCustomer = currentCustomer = customers.filter(customer => customer.firebaseId === uid);
    // if (Object.keys(firebaseCustomer).length !== 0) {
    //   //   this.props.history.push('/home');
    //   // } else {
    //   // const newCustomer = { ...this.state.newCustomer };
    //   // newCustomer.displayName = authRequests.getDisplayName();
    //   // newCustomer.email = authRequests.getEmail();
    //   // newCustomer.firebaseId = authRequests.getUid();
    //   // this.setState({ newCustomer: defaultCustomer });
    //   // this.addCustomer(newCustomer);
    //   this.createNewCustomer();
    // }
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
      this.customerValidation();
      this.props.history.push('/home');
    }).catch(err => console.error('error in authenticateUser function', err));
  }

  // dont think i should be setting state here because im going to use customers in other places
  // componentDidMount() {
  //   this.getCustomers();
  // }

  render() {
    const { customers, getCustomers } = this.props;

    return (
      <div className='Auth'>
        <button className='btn btn-outline-light' onClick={this.authenticateUser} customers={customers}>
          <img src={googleButton} alt="google login button" />
        </button>
      </div>
    );
  }
}

export default Auth;

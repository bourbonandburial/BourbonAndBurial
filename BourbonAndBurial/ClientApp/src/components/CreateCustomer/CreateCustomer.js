import React from 'react';
import './Customers.scss';
import authRequests from '../../../helpers/data/authRequests';

const defaultCustomer = {
  customerId: 0,
  displayName: '',
  email: '',
  firebaseId: '',
  isActive: true,
}

class CreateCustomer extends React.Component {
  state = {
    customers : [],
    currentCustomer : [],
    newCustomer : defaultCustomer
  }

  customerValidation = () => {
    const customers = this.state.customers;
    const uid = authRequests.getCurrentUid();
    const currentCustomer = customers.filter(customer => customer.firebaseId === uid);
    if (currentCustomer.length !== 0){
        this.props.history.push('/home');
    } else {
        this.setState({ currentCustomer });
    }
  }

  render() {
    return (
      <div className='Customers'>
      
      </div>
    );
  }
}

export default CreateCustomer;

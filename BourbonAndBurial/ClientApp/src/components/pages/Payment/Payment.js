import React from 'react';
import PropTypes from 'prop-types';
import PaymentForm from '../../PaymentForm/PaymentForm';
import paymentRequests from '../../../helpers/data/paymentRequests';
import customerRequests from '../../../helpers/data/customerRequests';
import authRequests from '../../../helpers/data/authRequests';
import './Payment.scss';

class Payment extends React.Component {
  static propTypes = {
    customerObject: PropTypes.object,
  }

  state = {
    payments: [],
  }

  componentDidMount() {
    const customerFbId = authRequests.getCurrentUser().uid;
    customerRequests.getSingleCustomer(customerFbId).then((customer) => {
      this.getCustomerPayments(customer.customerId);
    });  
  }

  getCustomerPayments = (customerId) => {
    paymentRequests.getCustomerPayments(customerId).then((results) => {
      this.setState({
        payments: results,
      });
    }).catch(err => console.error('error getting active payments for cutomers', err));
  }

  paymentSubmitEvent = (newCustomerPayment) => {
    console.log(newCustomerPayment);
    paymentRequests.createCustomerPayment(newCustomerPayment).then(() => {
    }).catch(err => console.error('error creating payments for customer', err));
  }



  render() {
    const { customerObject } = this.props;

    return (
      <div className='Payment'>
        <h2>Payments</h2>
        <PaymentForm
          customerObject={customerObject}
          onSubmit={this.paymentSubmitEvent}
        />
      </div>
    )
  }
}

export default Payment;
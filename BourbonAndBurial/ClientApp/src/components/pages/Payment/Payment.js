import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
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
      this.getCustomerPayments(newCustomerPayment.customerId);
    }).catch(err => console.error('error creating payments for customer', err));
  }



  render() {
    const { payments } = this.state;
    const { customerObject } = this.props;

    const paymentItems = payments.map((payment, i) => {
      return (
        <tr key={i}>
          <td>{payment.cardName}</td>
          <td>{payment.paymentName}</td>
          <td><Moment format="MM/YY">{payment.expDate}</Moment></td>
          {/* <td>{payment.isActive}</td> */}
          <td><i className="material-icons">&#xE5C8;</i></td>
        </tr>
      );
    });

    return (
      <div className='Payment'>
        <div className='container pt-5'>
          <table className="table table-striped table-hover table-light">
            <thead>
              <tr>
                <th>Card Name</th>
                <th>Card Type</th>
                <th>Expiration Date</th>
                {/* <th>Status</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paymentItems}
            </tbody>
          </table>
        </div>
        <div className='container p-form'>
          <PaymentForm
            customerObject={customerObject}
            onSubmit={this.paymentSubmitEvent}
          />
        </div>
      </div>
    )
  }
}

export default Payment;
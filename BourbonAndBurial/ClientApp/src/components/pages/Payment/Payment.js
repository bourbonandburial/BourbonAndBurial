import React from 'react';
import PropTypes from 'prop-types';
import PaymentForm from '../../PaymentForm/PaymentForm';
import './Payment.scss';

class Payment extends React.Component {
  static propTypes = {
    customerObject: PropTypes.object,
  }

  render() {
    const { customerObject } = this.props;

    return (
      <div className='Payment'>
        <h2>Payments</h2>
        <PaymentForm
          customerObject={customerObject}
        />
      </div>
    )
  }
}

export default Payment;
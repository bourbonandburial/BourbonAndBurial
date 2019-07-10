import React from 'react';
import './SingleOrder.scss';
import Moment from 'react-moment';

class SingleOrder extends React.Component {

  render() {
    const { orderId, order } = this.props;

    const goToOrderPage = () => {
      const orderPage = `/${orderId}`;
      window.location.assign(orderPage);
    };

    return (
      <tr>
        <td>{order.orderId}</td>
        <td>{order.customerId}</td>
        <td><Moment format="MM/DD/YYYY">{order.orderDate}</Moment></td>
        <td>{order.package}</td>
        <td>${order.total}</td>
        <td><a onClick={goToOrderPage} className="view" title="View Details" data-toggle="tooltip"><i className="material-icons">&#xE5C8;</i></a></td>
      </tr>
    );
  }
}

export default SingleOrder;
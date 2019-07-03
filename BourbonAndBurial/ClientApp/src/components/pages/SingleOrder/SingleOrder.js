import React from 'react';
import './SingleOrder.scss';
import Moment from 'react-moment';

class SingleOrder extends React.Component {

  render() {

    const { orderId } = this.props;

    const goToOrderPage = () => {
      const orderPage = `/${orderId}`;
      window.location.assign(orderPage);
    };

    return (
      <tr>
        <td>{this.props.orderId}</td>
        <td>{this.props.customerId}</td>
        <td><Moment format="MM/DD/YYYY">{this.props.orderDate}</Moment></td>
        <td>Cremation</td>
        <td>London</td>
        <td><span className="status text-success">&bull;</span> Delivered</td>
        <td>$300</td>
        <td><a onClick={goToOrderPage} className="view" title="View Details" data-toggle="tooltip"><i className="material-icons">&#xE5C8;</i></a></td>
      </tr>
    );
  }
}

export default SingleOrder;
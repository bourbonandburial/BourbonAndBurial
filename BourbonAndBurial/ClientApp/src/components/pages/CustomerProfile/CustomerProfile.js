import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../helpers/data/authRequests';
import customerRequests from '../../../helpers/data/customerRequests';
import './CustomerProfile.scss';
import orderRequests from '../../../helpers/data/orderRequests'
import SingleOrder from '../SingleOrder/SingleOrder'
import OrderDetailsPage from '../OrderDetailsPage/OrderDetailsPage'

class CustomerProfile extends React.Component {
  state = {
    firebaseUser: {},
    customerObject: {},
    orders: []
  }

  static propTypes = {
    logoutClickEvent: PropTypes.func,
  }

  deleteCustomer = (firebaseId) => {
    customerRequests.deleteCustomer(firebaseId)
      .then(() => {
        authRequests.logoutUser();
      })
      .catch(err => console.error('error setting isActive to false on customer', err));
  }

  displayCustomerOrders = (customerId) => {
    orderRequests.getCustomerOrders(customerId)
      .then((data) => {
        this.setState({ orders: data });
      }).catch(err => console.error('error getting products', err));
  }

  displaySingleOrder = (orderId) => {
    orderRequests.getSingleOrder(orderId)
    .then((data) => {
        this.setState({ orders: data });
        console.log(orderId)
    }).catch(err => console.error('error getting products', err));
}

  componentDidMount() {
    const customerFbId = authRequests.getCurrentUser().uid;
    customerRequests.getSingleCustomer(customerFbId).then((customer) => {
      this.setState({
        customerObject: customer,
      })
        this.displayCustomerOrders(customer.customerId);
    });
  }

  render() {
    const { customerObject } = this.state;

    const displayAddress = () => {
      if (customerObject.address2 === null) {
        return `${customerObject.address1}, ${customerObject.city}, ${customerObject.state} ${customerObject.zipcode}`;
      } else {
        return `${customerObject.address1}, ${customerObject.address2}, ${customerObject.city}, ${customerObject.state} ${customerObject.zipcode}`;
      }
    }

    const orderBuilder = this.state.orders.map((order) => {
      return (
      <SingleOrder
        orderId={order.orderId}
        key={order.orderId}
        customerId = {order.customerId}
        paymentTypeId={order.paymentTypeId}
        orderDate = {order.orderDate}
        displaySingleOrder = {this.displaySingleOrder}
      />);
    });
    
    return (
      <div className='CustomerProfile'>
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-4 mx-auto">
              <div className="card">
                <img className="card-img-top img-circle rounded-circle" src={customerObject.photo} alt="profile-pic"></img>
                <div className="card-block">
                  <h4 className="card-title mt-2">{customerObject.displayName}</h4>
                  <p className="card-position">
                    <i className="material-icons">place</i>{displayAddress()}
                  </p>
                  <p className="card-position">
                    <i className="material-icons">phone</i>{customerObject.phoneNumber}
                  </p>
                  <div className="card-footer">
                    <button type="button" className="btn btn-link profile-edit"><i className="material-icons">edit</i></button>
                    <button type="button" className="btn btn-link profile-payment"><i className="material-icons">credit_card</i></button>
                    <button type="button" className="btn btn-link profile-delete" onClick={() => this.deleteCustomer(customerObject.firebaseId)}><i className="material-icons">delete</i></button>
                  </div>
                </div>
              </div>
            </div>
            <div>
            <table className="table table-striped table-hover table-light mt-5">
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Customer #</th>
                      <th>Order Date</th>
                      <th>Base Package</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Net Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
              </table>
              {orderBuilder}
            </div>
          </div>
        </div>
      </div>
    )
  }};

export default CustomerProfile;
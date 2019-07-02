import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../helpers/data/authRequests';
import customerRequests from '../../../helpers/data/customerRequests';
import './CustomerProfile.scss';
import orderRequests from '../../../helpers/data/orderRequests'
import SingleOrder from '../SingleOrder/SingleOrder'
import OrderDetailsPage from '../OrderDetailsPage/OrderDetailsPage'
import EditModal from '../../EditModal/EditModal';

class CustomerProfile extends React.Component {
  state = {
    firebaseUser: {},
    orders: [],
    customerToEdit: {},
    isEditing: false,
    showModal: false,
  }

  static propTypes = {
    logoutClickEvent: PropTypes.func,
    updateCustomer: PropTypes.func,
    customerObject: PropTypes.object,
  }

  showModal = () => {
    this.setState({
      showModal: true,
    });
  };

  modalCloseEvent = () => {
    this.setState({
      isEditing: false,
      showModal: false,
      customerToEdit: {},
    });
  };

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

  editFormCustomer = () => {
    const customerFbId = this.props.customerObject.firebaseId;
    customerRequests.getSingleCustomer(customerFbId)
      .then((currentCustomer) => {
        const tempCustomer = currentCustomer;
        this.setState({
          isEditing: true,
          customerToEdit: tempCustomer,
        });
        this.showModal();
      })
      .catch(error => console.error(error));
  };

  editFormSubmitEvent = (updatedCustomer) => {
    const { updateCustomer } = this.props;
    customerRequests.updatedCustomer(updatedCustomer).then(() => {
      updateCustomer();
      this.setState({
        showModal: false,
        isEditing: false,
        customerToEdit: {},
      });
    }).catch(err => console.error('error in adding customer', err));
  }
  
  componentDidMount() {
    const customerFbId = authRequests.getCurrentUser().uid;
    customerRequests.getSingleCustomer(customerFbId).then((customer) => {
      this.displayCustomerOrders(customer.customerId);
    });  
  }

  render() {
    const { isEditing, showModal } = this.state;
    const { customerObject } = this.props;

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
            <div className="col-lg-3 mx-auto">
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
                    <button type="button" className="btn btn-link profile-edit" id={customerObject.firebaseId} onClick={this.editFormCustomer}><i className="material-icons">edit</i></button>
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
                  <tbody>{orderBuilder}</tbody>
              </table>
            </div>
          </div>
        </div>
        <EditModal
          showModal={showModal}
          currentCustomer={customerObject}
          isEditing={isEditing}
          editFormSubmitEvent={this.editFormSubmitEvent}
          modalCloseEvent={this.modalCloseEvent}
        />
      </div>
    );
  };
}


export default CustomerProfile;
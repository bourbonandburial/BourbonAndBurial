import React from 'react';
import './OrderDetailsPage.scss';
import orderRequests from '../../../helpers/data/orderRequests'
import SingleOrder from '../SingleOrder/SingleOrder'

class OrderDetailsPage extends React.Component{
state = {
    orders: []
}

    // displaySingleOrder = (orderId) => {
    //     orderRequests.getSingleOrder(orderId)
    //     .then((data) => {
    //         this.setState({ orders: data });
    //         console.log(orderId)
    //     }).catch(err => console.error('error getting products', err));
    // }

    componentDidMount = () => {
        // this.displaySingleOrder();
        const orderId = this.props.match.params.orderId;
        orderRequests.getSingleOrder(orderId)
        .then((data) => {
            this.setState({ orders: data })
            console.log(orderId)
        }).catch(err => console.error('error getting single order', err))
     }


    render() {
        let orders = this.state.orders;
        const orderBuilder = orders.map((order) => {
            return (
            <SingleOrder
              orderId={order.orderId}
              key={order.orderId}
              customerId = {order.customerId}
              paymentTypeId={order.paymentTypeId}
              orderDate = {order.orderDate}
            />);
          });
          return(
            <div>
                <div className="idk d-flex justify-content-around"><h3 className="orderReview mt-3">Review Your Order</h3> </div>
                <div className="builder d-flex justify-content-center"> {orderBuilder}</div>
            </div>
        );
      }
    }

export default OrderDetailsPage;
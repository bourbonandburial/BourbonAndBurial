import React from 'react';
import './OrderDetailsPage.scss';
import orderRequests from '../../../helpers/data/orderRequests'
import SingleOrder from '../SingleOrder/SingleOrder'
import SingleDetailedOrder from '../SingleDetailedOrder/SingleDetailedOrder';
import orderProductRequests from '../../../helpers/data/orderProductRequests';
import productRequests from '../../../helpers/data/productRequests';

class OrderDetailsPage extends React.Component{
state = {
    orderProducts: [],
    order: [],
    products: []
}

displaySingleDetailedOrder = () => {
  const orderId = this.props.match.params.orderId;
  orderRequests.getSingleOrder(orderId)
  .then((data) => {
    this.setState({ order: data});
    orderProductRequests.getProductDetailsForOrder(orderId)
    .then((data) => {
      this.setState({ orderProducts: data});
      console.log(data)
    })
  }).catch(err => console.error('error getting products', err));
}

  // productBuilder = () => {
  //   const { products } = this.state;
  //   const prods = () => Object.keys(products).map(function(key, index) {
  //     products[key];
  //   })
  //   console.log(prods)
  //   return prods;
  // };

    // objectMap(object, mapFn) {
    //   return Object.keys(object).reduce(function(result, key) {
    //     result[key] = mapFn(object[key])
    //     return result
    //   }, {})
    // }

    // productBuilder = () => {
    // const { products } = this.state;
    // const newObject = this.objectMap(products, function(value) {
    //   return value
    // })
    // console.log(newObject)
    // }


    componentDidMount = () => {
      this.displaySingleDetailedOrder();
    }

    render() {
      const { orderProducts, order } = this.state;
        const orderBuilder = orderProducts.map((orderProduct) => {
            return (
            <SingleDetailedOrder
              orderId={order.orderId}
              productId={orderProduct.productId}
              orderProductId={orderProduct.orderProductId}
              key={orderProduct.orderProductId}
              customerId = {order.customerId}
              paymentTypeId={order.paymentTypeId}
              orderDate = {order.orderDate}
              total = {order.total}
              productName = {orderProduct.productName}
              quantity={orderProduct.quantity}
              image={orderProduct.image}
            />)})
          
          return(
            <div>
                <div className="idk d-flex justify-content-around"><h3 className="orderReview mt-3">Review Your Order</h3> </div>
                <div className="builder d-flex justify-content-center"> {orderBuilder}</div>
            </div>
        );
      }
    }

export default OrderDetailsPage;
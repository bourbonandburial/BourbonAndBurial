import React from 'react';
import './OrderDetailsPage.scss';
import orderRequests from '../../../helpers/data/orderRequests'
import SingleOrder from '../SingleOrder/SingleOrder'
import SingleDetailedOrder from '../SingleDetailedOrder/SingleDetailedOrder';
import orderProductRequests from '../../../helpers/data/orderProductRequests';

class OrderDetailsPage extends React.Component{
state = {
    orderProduct: [],
    order: [],
    products: []
}

displaySingleDetailedOrder = () => {
  const orderId = this.props.match.params.orderId;
  orderRequests.getSingleOrder(orderId)
  .then((data) => {
    this.setState({ order: data, packageSelected: data.package});
    orderProductRequests.getProductDetailsForOrder(orderId)
    .then((data) => {
      this.setState({ orderProduct: data});
      console.log(data)
    })
  }).catch(err => console.error('error getting products', err));
}

  productBuilder = () => {
    const { orderProduct } = this.state;
    const prodMapping = orderProduct.map((orderProduct => orderProduct.productName))
      return <li>{`${prodMapping}, \n`} </li>;
  }

  getPackageImage = () => {
    const { packageSelected } = this.state;
    switch (packageSelected) {
      case 'Cremation': return <div className="cardz-img-top border"><i className="fa fa-fire fa-5x fa-icon-image mb-3"></i></div>
      case 'Burial': return <div className="cardz-img-top borderr"><i className="fa fa-recycle fa-5x fa-icon-image mb-3" ></i></div>
      case 'Mausoleum': return <div className="cardz-img-top border"><i className="fa fa-hospital-o fa-5x fa-icon-image mb-3"></i></div>
      default: return <div></div>
    }
  }

    componentDidMount = () => {
      this.displaySingleDetailedOrder();
    }

    render() {
      const { orderProduct, order } = this.state;

        // const orderBuilder = orderProducts.map((orderProduct) => {
          
          return(
            <div>
                <div className="idk d-flex justify-content-around"><h3 className="orderReview mt-3">Review Your Order</h3> </div>
                <div className="builder d-flex justify-content-center"> 
                <SingleDetailedOrder
                orderId={order.orderId}
                productId={orderProduct.productId}
                orderProductId={orderProduct.orderProductId}
                key={orderProduct.orderProductId}
                customerId = {order.customerId}
                paymentTypeId={order.paymentTypeId}
                orderDate = {order.orderDate}
                package = {order.package}
                total = {order.total}
                productName = {orderProduct.productName}
                quantity={orderProduct.quantity}
                productBuilder = {this.productBuilder}
                getPackageImage = {this.getPackageImage}
            />
                </div>
            </div>
        );
      }
    }

export default OrderDetailsPage;
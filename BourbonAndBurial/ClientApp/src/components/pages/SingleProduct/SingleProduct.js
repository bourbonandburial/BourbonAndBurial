import React from 'react';
import './SingleProduct.scss';
import productRequests from '../../../helpers/data/productRequests'

class SingleProduct extends React.Component {
//   state = {
//     shoppingCart: ["test1", "test2"]
// }

  deleteProduct = () => {
    productRequests.deleteProduct(this.props.productId)
      .then(() => {
        this.props.displayProducts();
      })
      .catch(err => console.error('error with single delete', err));
  };

  // selectedProduct = (productId) => {
  //   productRequests.getSingleProduct(productId).then((results) => {
  //     console.log(results);
  //     let newShoppingCart = this.state.shoppingCart; 
  //     newShoppingCart.push(results);
  //     this.setState({shoppingCart: newShoppingCart});
  //   })
  //     .catch(err => console.error('error with single delete', err));
  // };


  // addSelectedProduct = (productId) => {
  //  const product =  this.selectedProduct(productId)
  //  this.setState(this.state.shoppingCart.push(product))
  // };

  render() {
    return (
      <div className="col-sm-2 Services-tab item " onClick={() => this.props.selectedProduct(this.props.productId)}>
        <div className="singlePackCards folded-corner service_tab_1">
          <div className="text mb-1">
            <img className="card-img-top border" src={this.props.image} alt="Card image" />
            <div className="item-title">
              <h4 className="mt-1">{this.props.productName}</h4>
            </div>
            <p>
              {this.props.productDescription}
            </p>
            <div className="item-title singlePriceTag1">
              <h4>${this.props.price}</h4>
            </div>
            <div className="icon1" >
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleProduct;


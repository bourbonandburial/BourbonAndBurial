import React from 'react';
import './SingleProduct.scss';
import productRequests from '../../../helpers/data/productRequests'

class SingleProduct extends React.Component {

  deleteProduct = () => {
    productRequests.deleteProduct(this.props.productId)
      .then(() => {
        this.props.displayProducts();
      })
      .catch(err => console.error('error with single delete', err));
  };

  render() {
    return (
      <div className="col-sm-2 Services-tab item " onClick={() => this.deleteProduct(this.props.productId)}>
        <div className="singlePackCards folded-corner service_tab_1">
          <div className="text mb-6">
            <img className="card-img-top border" src={this.props.image} alt="Card-img" />
            <div className="item-title">
              <h4 className="mt-2">{this.props.productName}</h4>
            </div>
            <p>
              {this.props.productDescription}
            </p>
            <div className="item-title singlePriceTag1 mt-2">
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


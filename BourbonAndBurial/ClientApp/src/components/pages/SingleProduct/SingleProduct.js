import React from 'react';
import './SingleProduct.scss';
import productRequests from '../../../helpers/data/productRequests'

class SingleProduct extends React.Component{

    deleteProduct = () => {
        productRequests.deleteProduct(this.props.productId)
          .then(() => {
            this.props.displayProducts();
          })
          .catch(err => console.error('error with single delete', err));
      };
    
    render(){
        return(

      <div className="padding-div">
      <div className="card cardWidth">
        <img className="card-img-top border" src={this.props.image} alt="Card image" />
        <div className="card-body p-2">
          <h4 className="card-title">{this.props.productName}</h4>
          <p className="card-text">{this.props.productDescription}</p>
          <p className="card-text"><b>${this.props.price}</b></p>
          <button className="deleteButton btn btn-primary" onClick={() => this.deleteProduct(this.props.productId)}>Add To Cart</button>
        </div>
      </div>
      </div>
        );
    }
}

export default SingleProduct;


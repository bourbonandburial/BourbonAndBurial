import React from 'react';
import './SingleProduct.scss';
import productRequests from '../../../helpers/data/productRequests'
import CremationPackage from '../CremationPackage/CremationPackage'

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
      <div className="container py-3">
        <div className="card">
          <div className="row">
            <div className="col-md-4 rounded">
              <img src={this.props.image} alt="" className="img w-100 h-70" id="img"/>
            </div>
            <div className="col-md-8 p-3">
              <div className="details card-block px-3">
                <h4 className="card-title" id="name">{this.props.productName}</h4>
                <p className="card-text" id="description">{this.props.productDescription}</p>                {/* <p className="card-text" id="productTypeId"><b>Product Type Id: {this.props.productTypeId}</b></p> */}
                <p className="card-text" id="price"><b>Price: ${this.props.price}</b></p>
                <p className="card-text" id="quantity"><b>Quantity: {this.props.quantity}</b></p>
                <p className="card-text" id={this.props.id}></p>
                <button className="deleteButton btn btn-danger" onClick={() => this.deleteProduct(this.props.productId)}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
        );
    }
}

export default SingleProduct;


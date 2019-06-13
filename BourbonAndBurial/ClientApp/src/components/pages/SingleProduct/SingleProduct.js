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
          {/* <button className="deleteButton btn btn-danger" onClick={() => this.deleteProduct(this.props.productId)}>X</button> */}
          <button className="deleteButton btn btn-primary" onClick={() => this.deleteProduct(this.props.productId)}>Add To Cart</button>
        </div>
      </div>
      </div>

      /* // <div className="container py-1">
      //   <div className="card">
      //     <div className="row">
      //       <div className="col-md-3 rounded">
      //         <img src={this.props.image} alt="" className="img w-100 h-70" id="img"/>
      //       </div>
      //       <div className="col-md-8 p-3">
      //         <div className="details card-block px-3">
      //           <h4 className="card-title" id="name">{this.props.productName}</h4>
      //           <p className="card-text" id="description">{this.props.productDescription}</p>              
      //           <p className="card-text" id="price"><b>Price: ${this.props.price}</b></p>
      //           <p className="card-text" id="quantity"><b>Quantity: {this.props.quantity}</b></p>
      //           <p className="card-text" id={this.props.id}></p>
      //           <button className="deleteButton btn btn-danger" onClick={() => this.deleteProduct(this.props.productId)}>Remove</button>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div> */
        );
    }
}

export default SingleProduct;


import React from 'react';
import './ShoppingCart.scss';

class ShoppingCart extends React.Component{

    render() {
        
        return (
            <div className="shoppingCartCard">
            <img className="card-img-top1" src={this.props.image} alt="Card image cap"/>
                <div className="card-discription">
                   <p className="card-text1">{this.props.discription} Qty : {this.props.quantity}</p>
                </div>
                <div>
                <div onClick={this.authenticateUser} className="btn">X</div>
                </div>
            </div>
        );
      }
    }

export default ShoppingCart;
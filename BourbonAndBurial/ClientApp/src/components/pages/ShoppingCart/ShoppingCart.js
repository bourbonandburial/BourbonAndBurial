import React from 'react';
import './ShoppingCart.scss';

class ShoppingCart extends React.Component{

    render() {
        
        return (
            <div className="shoppingCartCard">
            <img className="card-img-top1" src={this.props.image} alt="Card image cap"/>
                <div className="card-discription">
                   <p className="card-text1"> Qty : 1</p>
                   <p className="card-text1">{this.props.price}</p>
                </div>
                <div>
                <div onClick={() => this.props.removeFromCart(this.props.productId, this.props.shoppingCartState)} className="btn">X</div>
                </div>
            </div>
        );
      }
    }

export default ShoppingCart;
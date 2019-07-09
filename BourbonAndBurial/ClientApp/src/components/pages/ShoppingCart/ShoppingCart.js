import React from 'react';
import PropTypes from 'prop-types';
import './ShoppingCart.scss';

const defaultOrder = {
    customerId: 0,
    paymentTypeId: 0,
    orderDate: '',
}
class ShoppingCart extends React.Component {
    state = {
        cart: [],
        newOrder: defaultOrder,
    }

    static propTypes = {
        removeFromCart: PropTypes.func,
        cartItem: PropTypes.object,
        shoppingCart: PropTypes.array,
        itemCount: PropTypes.number,
    }

    render() {
        const { removeFromCart, shoppingCart, cartItem, itemCount } = this.props;

        return (
            <div className="shoppingCartCard justify-content-center">
                <img className="card-img-top1" src={cartItem.image} alt="Card image cap" />
                <div className="card-discription">
                    <p className="card-text1">Quanity: 1</p>
                    <p className="card-text1">{cartItem.price}</p>
                </div>
                <div>
                    <div onClick={() => removeFromCart(cartItem.productId, shoppingCart)} className="btn">X</div>
                </div>
            </div>
        );
    }
}

export default ShoppingCart;
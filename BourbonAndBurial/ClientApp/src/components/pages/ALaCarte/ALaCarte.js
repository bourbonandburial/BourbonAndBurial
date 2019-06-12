import React from 'react';
import './ALaCarte.scss';
import productRequests from '../../../helpers/data/productRequests'
import SingleProduct from '../SingleProduct/SingleProduct'

class ALaCarte extends React.Component {
    state = {
        products : []
    }

    displayProducts = () => {
        productRequests.getAllProducts()
        .then((data) => {
            this.setState({ products: data });
        }).catch(err => console.error('error getting products', err));
    }

    componentDidMount = () => {
        this.displayProducts();
    }

    render() {
        const productBuilder = this.state.products.map((product) => {
          return (<SingleProduct
            productId={product.productId}
            key={product.productId}
            image={product.image}
            productName={product.productName}
            productDescription={product.productDescription}
            productTypeId={product.productTypeId}
            price={product.price}
            quantity={product.quantity}
            displayProducts={this.displayProducts}
          />);
        });
        return (
          <div class="Products">
            <h1 class="la-text text-center">Add Additional Items</h1>
            <div class="builder">{productBuilder}</div>
            <div class="productArea">
            </div>
          </div>
        );
      }
}

export default ALaCarte;
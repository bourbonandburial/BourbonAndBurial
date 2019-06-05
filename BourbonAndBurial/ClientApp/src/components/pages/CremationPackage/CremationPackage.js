import React from 'react';
import './CremationPackage.scss';
import productRequests from '../../../helpers/data/productRequests'
import SingleProduct from '../SingleProduct/SingleProduct'

class IndividualPackage extends React.Component {
    state = {
        products : []
    }

    // deleteProduct = () => {
    //   productRequests.deleteProduct()
    //   .then((data) => {
    //     this.setState({ products: data });
    //   }).catch(err => console.error('error getting products', err));
    // }

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
           deleteProduct={this.displayProducts}
          />);
        });
        return (
          <div className="Products">
            <div className="builder">{productBuilder}</div>
            <div className="productArea">
            </div>
          </div>
        );
      }
}

export default IndividualPackage;
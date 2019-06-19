import React from 'react';
import './ALaCarte.scss';
import productRequests from '../../../helpers/data/productRequests'
import SingleProduct from '../SingleProduct/SingleProduct'
import ShoppingCart from '../ShoppingCart/ShoppingCart'

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
          // <div className="container d-flex">
          //   <div className="titleName .text-center ">"Ala Carte"</div>
          //   <div className="row justify-content-around mt-5">
          //     <div className="row">{productBuilder}</div>
          //   </div>
          //   <div className="productArea"><ShoppingCart /></div>

          // </div>

          <div className="container">
            <div className="row">
              <div className="textSizeAla col-md-5 text-center">
               "Ala Carte"
              </div>
              <div className="col-md-8">
                <div className="row justify-content-around mt-5">
                  <div className="row">{productBuilder}</div>
                </div>
              </div>
              <div className="col col-lg-4">
                <div className="textSizeAla text-center"><ShoppingCart /></div>
              </div>
            </div>
          </div>
         
        );
      }
}

export default ALaCarte;
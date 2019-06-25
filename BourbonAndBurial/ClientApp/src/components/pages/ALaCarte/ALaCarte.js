import React from 'react';
import './ALaCarte.scss';
import productRequests from '../../../helpers/data/productRequests'
import SingleProduct from '../SingleProduct/SingleProduct'
import ShoppingCart from '../ShoppingCart/ShoppingCart'
import PackageDisplay from '../PackageDisplay/PackageDisplay'

class ALaCarte extends React.Component {
  state = {
    products: [],
    shoppingCart: []
  }

  displayProducts = () => {
    productRequests.getAllProducts()
      .then((data) => {
        this.setState({ products: data });
      }).catch(err => console.error('error getting products', err));
  }

  shoppinCartDisplay = () => {
   // setState({ products: data });
   console.log("This is setting State");
  }

  selectedProduct = (productId) => {
    productRequests.getSingleProduct(productId).then((results) => {
      console.log(results);
      let newShoppingCart = this.state.shoppingCart; 
      newShoppingCart.push(results);
      this.setState({shoppingCart: newShoppingCart});
    })
      .catch(err => console.error('error with single delete', err));
  };


  componentDidMount = () => {
    this.displayProducts();
  }

  render() {
    const productBuilder = this.state.products.map((product) => {
      return (
        <SingleProduct
          productId={product.productId}
          key={product.productId}
          image={product.image}
          productName={product.productName}
          productDescription={product.productDescription}
          productTypeId={product.productTypeId}
          price={product.price}
          quantity={product.quantity}
          selectedProduct={this.selectedProduct}
        />
      );
    });
    return (
      <div className="home parallax">
        <div className="container ">
          <div className="row">
            <div className="textSizeAla col-md-15 text-center">
              "Ala Carte"
                <ul>
                <PackageDisplay package={this.props.match.params.package} />
              </ul>
            </div>

            <div className="col-md-8">
              <div className="row justify-content-around mt-5">
                <div className="row">{productBuilder}</div>
              </div>
            </div>


            <div className="col col-lg-4">
              <div className="cart textSizeAla text-center">
                <ShoppingCart
                 shoppinCart={this.state.shoppinCart}
                 
               /></div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default ALaCarte;
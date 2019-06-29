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

  selectedProduct = (productId) => {
    productRequests.getSingleProduct(productId).then((results) => {
      console.log(results);
      let newShoppingCart = this.state.shoppingCart; 
      newShoppingCart.push(results);
      this.setState({shoppingCart: newShoppingCart});
    })
      .catch(err => console.error('error with add to cart', err));
  };
 
   
  removeFromCart = (productId, state) => {

    let newArray = state;
    state.forEach(function(element) {
        if (productId === element.productId) {
            let productIdIndex = newArray.indexOf(element);
            newArray.splice(productIdIndex, 1);
          
        }
      

    });
    this.setState({
      shoppingCart: newArray
  });

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

    const shoppingCartBuilder = this.state.shoppingCart.map((shoppingCart) => {
      return (
        <ShoppingCart
          productId={shoppingCart.productId}
          image={shoppingCart.image}
          discription={shoppingCart.productDescription}
          quantity={shoppingCart.quantity}
          shoppingCartState={this.state.shoppingCart}
          removeFromCart={this.removeFromCart}
        />
      );
    });

    return (
      <div className="home parallax">
      <div className="container ">
         <div className="row">
            <div className="textAla col-md-15 ">
              
               <ul>
                  <PackageDisplay package={this.props.match.params.package} />
               </ul>
            </div>
            <div className="col-md-8">
               <div className="row justify-content-around mt-5">
                  <div className="row">{productBuilder}</div>
               </div>
            </div>
            <div className="col shoppingCartDiv col-lg-4">
               <div className="cart  textSizeAla">
                  <div className="area ">
                     <p>Shopping Cart</p>
                  </div>
                  {shoppingCartBuilder}
               </div>
            </div>
         </div>
      </div>
   </div>
    );
  }
}

export default ALaCarte;
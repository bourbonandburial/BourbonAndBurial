import React from 'react';
import SearchField from 'react-search-field';
import './ALaCarte.scss';
import productRequests from '../../../helpers/data/productRequests'
import SingleProduct from '../SingleProduct/SingleProduct'
import ShoppingCart from '../ShoppingCart/ShoppingCart'
import PackageDisplay from '../PackageDisplay/PackageDisplay'

class ALaCarte extends React.Component {

  state = {
    products: [],
    shoppingCart: [],
    filteredProducts: [],
    total: []
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
      let productPrice = this.state.total;
      newShoppingCart.push(results);
      productPrice.push(results.price);
      this.setState({shoppingCart: newShoppingCart})
      this.setState({total: productPrice})
    })
      .catch(err => console.error('error with add to cart', err));
  };


  removeFromCart = (productId, state) => {

    let newArray = state;
    // let newTotal = this.state.total;
    
    for(let i = 0; i < state.length; i++){
      if (productId === state[i].productId){
        let productIdIndex = i;
        newArray.splice(productIdIndex, 1);
        break;
      }
    }
    this.setState({
      shoppingCart: newArray
    });
  };

  componentDidMount = () => {
    this.displayProducts();
  }

  onChange = (value, event) => {
    const { products } = this.state;
    const filteredProducts = [];
    event.preventDefault();
    if (!value) {
      this.setState({ filteredProducts: products });
    } else {
      products.forEach((product) => {
        if (product.productName.toLowerCase().includes(value.toLowerCase()) || (product.productDescription.toLowerCase().includes(value.toLowerCase()))) {
          filteredProducts.push(product);
        }
        this.setState({ filteredProducts });
      });
    }
  }

  render() {
    const { filteredProducts } = this.state;

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

    const shoppingCartBuilder = this.state.shoppingCart.map((shoppingCart, i) => {
      return (
        <ShoppingCart
          key={i}
          productId={shoppingCart.productId}
          price={shoppingCart.price}
          image={shoppingCart.image}
          discription={shoppingCart.productDescription}
          quantity={shoppingCart.quantity}
          shoppingCartState={this.state.shoppingCart}
          removeFromCart={this.removeFromCart}
        />
      );
    });

    const singleFilteredProduct = filteredProducts.map(product => (
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
    ));

    return (
      <div className="ALaCarte">
        <div className="parallax">
          <div className="container">
            <div className="">
            
            
                <div class="card-body">
                  <h5 class="card-title"></h5>
                  <h6 class="card-subtitle mb-2 text-muted">
                  <PackageDisplay package={this.props.match.params.package} />
                  </h6>
                </div>
              

              {/* <div className="textAla col-lg-11 ">
                  <PackageDisplay package={this.props.match.params.package} />
              </div> */}


              <div className="searchCart">
                <SearchField
                  className=" searchField col-sm-6 searchCart mx-auto"
                  placeholder='Search by Brand Name or Description'
                  onChange={this.onChange}
                />
                <div className="cart mt-2">
                  <div className=" textSizeAla mr-n2">
                    <div className="area ">
                      <p>Shopping Cart</p>
                    </div>
                    {shoppingCartBuilder}
                    
                  </div>
                </div>

              </div>
              <div className=" productDiv col-sm-8">
                <div className="row justify-content-around mt-5">
                  <div className="row">
                    {singleFilteredProduct}
                    {productBuilder}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default ALaCarte;
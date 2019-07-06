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
    total: 0,
  }

  displayProducts = () => {
    productRequests.getAllProducts()
      .then((data) => {
        this.setState({ products: data });
      }).catch(err => console.error('error getting products', err));
  }

  selectedProduct = (productId) => {
    productRequests.getSingleProduct(productId).then((results) => {
      // pushing new item to shopping carrt
      this.setState(prevState => ({
        shoppingCart: [...prevState.shoppingCart, results]
      }));
    })
      .catch(err => console.error('error with add to cart', err));
  };


  removeFromCart = (productId, state) => {
    let newArray = state;
    for (let i = 0; i < state.length; i++) {
      if (productId === state[i].productId) {
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.shoppingCart !== this.state.shoppingCart) {
      let tempTotal = 0;
      this.state.shoppingCart.forEach((item) => {
        tempTotal += item.price;
      })
      this.setState({ total: tempTotal });
    }
  }
  render() {
    const { filteredProducts, shoppingCart, total } = this.state;

    // const itemCount = itemId => {
    //   if (shoppingCart.find(item => item.productId === itemId)) {
    //     const itemCount = shoppingCart.filter(item => item.productId === itemId).length;
    //     return itemCount
    //   } else {
    //     return itemCount = 1;
    //   // }
    // }

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

    const shoppingCartBuilder = shoppingCart.map((cartItem, i) => {
      // console.log(shoppingCart.filter(item => item.productId === cartItem.productId));
      // if (shoppingCart.filter(item => item.productId === cartItem.productId)) {

      // } else {
      return (
        <ShoppingCart
          key={i}
          // productId={cartItem.productId}
          // price={cartItem.price}
          // image={cartItem.image}
          // discription={cartItem.productDescription}
          // quantity={cartItem.quantity}
          shoppingCart={this.state.shoppingCart}
          removeFromCart={this.removeFromCart}
          cartItem={cartItem}
        // itemCount={itemCount(cartItem.productId)}
        />
      );
      // }
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
              <div className="textAla col-lg-11 ">
                <ul>
                  <PackageDisplay package={this.props.match.params.package} />
                </ul>
              </div>
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
                    <h5 className='cart-total'>Total: ${total}</h5>
                    <button type="button" className="btn submit-order-btn">Complete Order</button>
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
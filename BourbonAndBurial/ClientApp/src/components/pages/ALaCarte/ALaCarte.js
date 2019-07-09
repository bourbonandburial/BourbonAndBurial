import React from 'react';
import SearchField from 'react-search-field';
import './ALaCarte.scss';
import productRequests from '../../../helpers/data/productRequests'
import SingleProduct from '../SingleProduct/SingleProduct'
import ShoppingCart from '../ShoppingCart/ShoppingCart'
import PackageDisplay from '../PackageDisplay/PackageDisplay'

const defaultPackage = {
  name: '',
  price: 0,
}

class ALaCarte extends React.Component {

  state = {
    products: [],
    shoppingCart: [],
    filteredProducts: [],
    total: 0,
    packageSelected: defaultPackage,
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

  getPackageType = () => {
    const type = this.props.match.params.package;
    switch (type) {
      case 'cremation': return this.setState({ packageSelected: { name: 'Cremation', price: 300 }, total: 300 });
      case 'burial': return this.setState({ packageSelected: { name: 'Burial', price: 1000 }, total: 1000 });
      case 'mausoleum': return this.setState({ packageSelected: { name: 'Mausoleum', price: 2999 }, total: 2999 });
      default: return this.packageAmount('', 0);
    }
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

  componentWillMount() {
    this.getPackageType();
  }

  componentDidMount = () => {
    this.displayProducts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.shoppingCart !== this.state.shoppingCart) {
      let tempTotal = this.state.packageSelected.price;
      this.state.shoppingCart.forEach((item) => {
        tempTotal += item.price;
      })
      this.setState({ total: Number(tempTotal).toFixed(2) });
    }
  }

  render() {
    const { filteredProducts, shoppingCart, total, packageSelected } = this.state;

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
      return (
        <ShoppingCart
          key={i}
          shoppingCart={this.state.shoppingCart}
          removeFromCart={this.removeFromCart}
          cartItem={cartItem}
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
                  className=" searchField "
                  placeholder='Search by Brand Name or Description'
                  onChange={this.onChange}
                />
                <div className="cart">
                  <div className=" textSizeAla mr-n2">
                    <div className="area ">
                      <p>Shopping Cart</p>
                    </div>
                    <h5>Package: {packageSelected.name}</h5>
                    <div className="shoppingBuilder mb-3">{shoppingCartBuilder}</div>
                    <h5 className='cart-total'>Total: ${total}</h5>
                    <button type='button' className='btn submit-order-btn'>Complete Order</button>
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
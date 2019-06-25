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
    filteredProducts: [],
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

  onChange = (value, event) => {
    const {products} = this.state;
    const filteredProducts = [];
    event.preventDefault();
    if (!value) {
      this.setState({ filteredProducts: products });
    } else {
      products.forEach((product) => {
        if (product.productName.toLowerCase().includes(value.toLowerCase())){
          filteredProducts.push(product);
        }
        this.setState({ filteredProducts });
      });
    }
  }

  render() {
    const {filteredProducts} = this.state;

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
          displayProducts={this.displayProducts}
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
          />
      ));
      
    return (
      <div className="home parallax">
        <SearchField 
        placeholder='Search item'
        onChange={this.onChange}
        />
        <div className="container ">
          <div className="row">
            <div className="textSizeAla col-md-15 text-center">
                <ul>
                <PackageDisplay package={this.props.match.params.package} />
              </ul>
            </div>

            <div className="col-md-8">
              <div className="row justify-content-around mt-5">
                <div className="row"> {singleFilteredProduct} {productBuilder}</div>
              </div>
            </div>


            <div className="col col-lg-4">
              <div className="cart textSizeAla text-center"><ShoppingCart /></div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default ALaCarte;
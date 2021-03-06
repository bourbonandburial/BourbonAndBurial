import React from 'react';
import PropTypes from 'prop-types';
import SearchField from 'react-search-field';
import './ALaCarte.scss';
import productRequests from '../../../helpers/data/productRequests'
import SingleProduct from '../SingleProduct/SingleProduct'
import ShoppingCart from '../ShoppingCart/ShoppingCart'
import PackageDisplay from '../PackageDisplay/PackageDisplay'
import orderRequests from '../../../helpers/data/orderRequests';
import paymentRequests from '../../../helpers/data/paymentRequests';
import customerRequests from '../../../helpers/data/customerRequests';
import authRequests from '../../../helpers/data/authRequests';
import orderProductRequests from '../../../helpers/data/orderProductRequests';

const defaultPackage = {
  name: '',
  price: 0,
}

const defaultOrder = {
  customerId: 0,
  paymentTypeId: 0,
  orderDate: '',
  total: 0,
  package: '',
}

const defaultOrderProduct = {
  orderId: 0,
  productIdIndex: 0,
}

class ALaCarte extends React.Component {
  static propTypes = {
    customerObject: PropTypes.object,
  }

  state = {
    products: [],
    shoppingCart: [],
    filteredProducts: [],
    total: 0,
    packageSelected: defaultPackage,
    newOrder: defaultOrder,
    payments: [],
    newOrderProduct: defaultOrderProduct,
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

  getSingleProductPrice = productId => {
    productRequests.getSingleProduct(productId).then((product) => {
      const newTotal = this.state.total - product.price;
      this.setState({ total: newTotal.toFixed(2) });
    })
  }

  removeFromCart = (productId, state) => {
    let newArray = state;
    for (let i = 0; i < state.length; i++) {
      if (productId === state[i].productId) {
        let productIdIndex = i;
        newArray.splice(productIdIndex, 1);
        break;
      }
    }
    this.getSingleProductPrice(productId);
    this.setState({
      shoppingCart: newArray,
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

  formFieldStringState = (name, e) => {
    const tempOrder = { ...this.state.newOrder };
    tempOrder[name] = e.target.value;
    this.setState({ newOrder: tempOrder });
  }

  paymentChange = e => this.formFieldStringState('paymentTypeId', e);

  goToOrderPage = (orderId) => {
    const orderPage = `/${orderId}`;
    window.location.assign(orderPage);
  };


  createOrderProducts = orderId => this.state.shoppingCart.map((item) => {
    const newOrderProduct = { ...this.state.newOrderProduct }
    newOrderProduct.orderId = orderId;
    newOrderProduct.productId = item.productId;
    orderProductRequests.addOrderProduct(newOrderProduct).then(() => {
    }).catch(err => console.error('error adding orderProduct', err));
  })

  onSubmit = newOrder => {
    orderRequests.addOrder(newOrder).then((results) => {
      const order = results.data;
      this.createOrderProducts(order.orderId);
      this.goToOrderPage(order.orderId);
      this.setState({
        newOrder: defaultOrder,
        newOrderProduct: defaultOrderProduct,
        shoppingCart: [],
        total: 0,
      });
    }).catch(err => console.error(err));
  }

  submitOrder = e => {
    e.preventDefault();
    const { customerObject } = this.props;
    const { total, packageSelected } = this.state;
    const newOrder = { ...this.state.newOrder };
    const currentDate = new Date();
    newOrder.customerId = customerObject.customerId;
    newOrder.orderDate = currentDate;
    newOrder.total = Number(total);
    newOrder.package = packageSelected.name;
    this.onSubmit(newOrder);
    this.setState({
      newOrder: defaultOrder,
    })
  }

  componentWillMount() {
    this.getPackageType();
  }

  componentDidMount = () => {
    this.displayProducts();

    const customerFbId = authRequests.getCurrentUser().uid;
    customerRequests.getSingleCustomer(customerFbId).then((customer) => {
      paymentRequests.getCustomerPayments(customer.customerId).then((results) => {
        this.setState({ payments: results });
      });
    });
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
    const { filteredProducts, shoppingCart, total, packageSelected, payments, newOrder, products } = this.state;

    const productBuilder = products.map((product) => {
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

    const buildPaymentDropdown = payments.map(payment => {
      return (
        <option key={payment.paymentTypeId} value={payment.paymentTypeId}>{payment.cardName}</option>
      );
    })

    return (
      <div className="ALaCarte">
      <div className="parallax">
        <div className="container">
          <div className="">
            <div className="card-body">
              <h5 className="card-title"></h5>
              <h6 className="card-subtitle mb-2 text-muted">
                      <PackageDisplay package={this.props.match.params.package} />
                      </h6>
            </div>
            <div className="searchCart">
              <SearchField className=" searchField " placeholder='Search by Brand Name or Description' onChange={this.onChange} />
              <div className="cart">
                <div className=" textSizeAla mr-n2 input-group ">
                  <div className="area">
                    <p>Shopping Cart</p>
                  </div>
                  <h5 className="">Package: {packageSelected.name}</h5>
                  <div className="shoppingBuilder mb-3 ">{shoppingCartBuilder}</div>
                  <h5 className='cart-total '>Total: ${total}</h5>
                  <div className=" mb-3 ">
                    <select className="custom-select buttonDiv" id="inputGroupSelect02" name="paymentTypeId" value={newOrder.paymentTypeId} onChange={this.paymentChange}>{buildPaymentDropdown}</select>
                  </div>
                  <button className='mx-auto btn submit-order-btn' onClick={(e)=>this.submitOrder(e)}>Complete Order</button>
                </div>
              </div>
            </div>
            <div className=" productDiv col-sm-8">
              <div className="row justify-content-around mt-5">
                <div className="row">{singleFilteredProduct} {productBuilder}</div>
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
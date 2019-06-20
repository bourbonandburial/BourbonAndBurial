import React from 'react';
import PropTypes from 'prop-types';
import PackageCards from '../PackageCards/PackageCards';
import RegisterModal from '../../RegisterModal/RegisterModal';
import productRequests from '../../../helpers/data/productRequests';
import customerRequests from '../../../helpers/data/customerRequests';
import authRequests from '../../../helpers/data/authRequests';
import './Home.scss';

class Home extends React.Component {
  state = {
    packageOne: [],
    packageTwo: [],
    packageThree: [],
    firebaseUser: {},
    customers: [],
    showModal: false,
    isRegistered: false,
  }

  static propTypes = {
    logoutClickEvent: PropTypes.func,
    authed: PropTypes.bool,
  }

  getCustomers = () => {
    customerRequests.getAllCustomers().then((data) => {
      this.setState({ customers: data });
      this.customerValidation();
    }).catch(err => console.error('error in getAllCustomers', err));
  }

  // checking to see if user is already in db.
  // if so, go to homepage. if not, add user to db and then go to home
  customerValidation = () => {
    const { customers, firebaseUser } = this.state;
    //if there are no users
    // const customerInFirebase = customerRequests.getSingleCustomer(firebaseUser.uid)
    //   .then()
    //   .catch(err => console.error('error in getting single customer', err));
    // console.log(customerInFirebase);
    if (customers !== undefined || customers.length !== 0) {
      const customerFromDb = customers.find(customerObject => customerObject.firebaseId === firebaseUser.uid);
      if (customerFromDb === undefined) {
        this.showModal();
        this.setState({ isRegistered: false });
      } else {
        this.setState({ isRegistered: true });
      }
    }
  }

  showModal = () => {
    this.setState({
      showModal: true,
    });
  };

  customerFormSubmitEvent = (newCustomer) => {
    customerRequests.createCustomer(newCustomer).then(() => {
    }).catch(err => console.error('error in adding customer', err));
    this.setState({
      showModal: false,
      isRegistered: true,
    });
  }

  displayPackageOneProducts = () => {
    productRequests.getPackageProducts('cremation')
      .then((data) => {
        this.setState({ packageOne: data });
      }).catch(err => console.error('error getting products', err));
  }

  displayPackageTwoProducts = () => {
    productRequests.getPackageProducts('burial')
      .then((data) => {
        this.setState({ packageTwo: data });
      }).catch(err => console.error('error getting products', err));
  }

  displayPackageThreeProducts = () => {
    productRequests.getPackageProducts('mausoleum')
      .then((data) => {
        this.setState({ packageThree: data });
      }).catch(err => console.error('error getting products', err));
  }

  componentWillMount() {
    const customerFromFb = authRequests.getCurrentUser();
    this.setState({
      firebaseUser: customerFromFb
    });

    this.getCustomers();
  }

  componentDidMount = () => {
    this.displayPackageOneProducts();
    this.displayPackageTwoProducts();
    this.displayPackageThreeProducts();
  }

  render() {
    const { firebaseUser, isRegistered } = this.state;
    const { logoutClickEvent } = this.props;

    if (!isRegistered) {
      return (
        <div className="home">
          <RegisterModal
            onSubmit={this.customerFormSubmitEvent}
            firebaseUser={firebaseUser}
            logoutClickEvent={logoutClickEvent}
          />
        </div>
      );
    }
    return (
      <div className="home">
        <PackageCards />
      </div>
    );
  }
}

export default Home;

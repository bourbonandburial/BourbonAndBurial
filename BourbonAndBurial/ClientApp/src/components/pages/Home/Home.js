import React from 'react';
import PropTypes from 'prop-types';
import './Home.scss';
import PackageCards from '../PackageCards/PackageCards';
import customerRequests from '../../../helpers/data/customerRequests';
import authRequests from '../../../helpers/data/authRequests';
import RegisterModal from '../../RegisterModal/RegisterModal';

class Home extends React.Component {
  static propTypes = {
    logoutClickEvent: PropTypes.func,
    authed: PropTypes.bool,
  }

  state = {
    firebaseUser: {},
    customers: [],
    showModal: false,
  }

  componentWillMount() {
    const currentCustomer = authRequests.getCurrentUser();
    this.setState({
      firebaseUser: currentCustomer
    });

    this.getCustomers();
  }

  getCustomers = () => {
    customerRequests.getAllCustomers().then((results) => {
      const data = results.data;
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
      const currentCustomer = customers.find(customerObject => customerObject.firebaseId === firebaseUser.uid);
      if (currentCustomer === undefined) {
        this.showModal();
      }
    }
  }

  showModal = (e) => {
    this.setState({
      showModal: true,
    });
  };

  closeModalEvent = () => {
    this.setState({
      showModal: false,
    });
  };
  
  customerFormSubmitEvent = (newCustomer) => {
    customerRequests.createCustomer(newCustomer).then(() => {
    }).catch(err => console.error('error in adding customer', err));
    this.setState({
      showModal: false,
    });
  }

  render() {
    const { showModal, firebaseUser } = this.state;

    return (
      <div className="home">
        <PackageCards />
        <RegisterModal
          showModal={showModal}
          onSubmit={this.customerFormSubmitEvent}
          closeModalEvent={this.closeModalEvent}
          firebaseUser={firebaseUser}
        />
      </div>
    );
  }
}

export default Home;

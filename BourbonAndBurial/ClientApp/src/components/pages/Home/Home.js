import React from 'react';
import './Home.scss';
import PackageCards from '../PackageCards/PackageCards';
import customerRequests from '../../../helpers/data/customerRequests';
import authRequests from '../../../helpers/data/authRequests';
import RegisterModal from '../../RegisterModal/RegisterModal';


// const defaultCustomer = {
//   displayName: '',
//   email: '',
//   firebaseId: '',
//   isActive: true,
// }

class Home extends React.Component {
  state = {
    // newCustomer: defaultCustomer,
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

    //  this.customerValidation();
  }

  getCustomers = () => {
    customerRequests.getAllCustomers().then((results) => {
      const data = results.data;
      console.log('customers', data);
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
      console.log('valid', currentCustomer);
      if (currentCustomer === undefined) {
        this.showModal();
        //this.createNewCustomer();
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

  // createNewCustomer = () => {
  //   const { firebaseUser } = this.state;
  //   const newCustomer = { ...this.state.newCustomer };
  //   newCustomer.displayName = firebaseUser.providerData[0].displayName;
  //   newCustomer.email = firebaseUser.providerData[0].email;
  //   newCustomer.firebaseId = firebaseUser.uid;
  //   this.setState({ newCustomer: defaultCustomer });
  //   this.addCustomer(newCustomer);
  // }

  // addCustomer = (newCustomer) => {
  //   customerRequests.createCustomer(newCustomer).then(() => {
  //   }).catch(err => console.error('error in adding customer', err));
  // }

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
      <div className="home" >
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

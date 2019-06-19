import React from 'react';
import PropTypes from 'prop-types';
import customerRequests from '../../../helpers/data/customerRequests';
import authRequests from '../../../helpers/data/authRequests';

import './Auth.scss';

const defaultCustomer = {
  displayName: '',
  email: '',
  firebaseId: '',
  isActive: true,
}

class Auth extends React.Component {
  state = {
    // newCustomer: defaultCustomer,
    // firebaseUser: {},
    // customers: [],
    modal: false,
  }

  static propTypes = {
    authed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
  }

  toggleModal = () => {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  }

  // getCustomers = () => {
  //   customerRequests.getAllCustomers().then((results) => {
  //     const data = results.data;
  //     this.setState({ customers: data });
  //   }).catch(err => console.error('error in getAllCustomers', err));
  // }

  authenticateUser = () => {
    authRequests.googleAuth().then(() => {
      // this.getCustomerInfoFromFb();
      // this.customerValidation();
    }).catch(err => console.error('error in authenticateUser function', err));
  }

  // getCustomerInfoFromFb = () => {
  //   const fireUser = authRequests.getCurrentUser();
  //   this.setState({
  //     firebaseUser: fireUser
  //   });
  // }

  // checking to see if user is already in db.
  // if so, go to homepage. if not, add user to db and then go to home
  // customerValidation = () => {
  //   const { customers, firebaseUser } = this.state;
  //   //if there are no users
  //   if (customers !== undefined || customers.length !== 0) {
  //     const currentCustomer = customers.find(customerObject => customerObject.firebaseId === firebaseUser.uid);
  //     if (currentCustomer === undefined) {
  //       this.createNewCustomer();
  //     }
  //   }
  // }

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

  // componentDidMount() {
  //   this.getCustomers();
    
  // }

  render() {
    
    return (
      <div className='Auth'>
        <div className="loginBoarder">
          <div className="text-center">
            <p className="loginText text-center"></p>
            {/* <div className="loginText2 btn" onClick={this.authenticateUser}><img src="https://github.com/ke4tri/Images/blob/master/GetStartedButton.png?raw=true" alt="bourbon-img" /></div> */}
            <div onClick={this.authenticateUser} className="loginText2 btn"><img src="https://github.com/ke4tri/Images/blob/master/GetStartedButton.png?raw=true" alt="bourbon-img" /></div>
            <div className="grave parallax"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;

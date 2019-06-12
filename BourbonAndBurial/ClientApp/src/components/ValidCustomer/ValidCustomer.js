import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../helpers/data/authRequests';
import customerRequests from '../../helpers/data/customerRequests'
import { NavLink } from 'reactstrap';
import './ValidCustomer.scss';

const defaultCustomer = {
  displayName: '',
  email: '',
  firebaseId: '',
  isActive: true,
}

class ValidCustomer extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    logoutClickEvent: PropTypes.func,
    customers: PropTypes.array,
  }

  state = {
    newCustomer: defaultCustomer,
    firebaseUser: {},
  }

  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.googleAuth().then(() => {
      this.getCustomerInfoFromFb();
      this.customerValidation();
    }).catch(err => console.error('error in authenticateUser function', err));
  }

  // checking to see if user is already in db.
  // if so, go to homepage. if not, add user to db and then go to home
  customerValidation = () => {
    const { customers } = this.props;
    const firebaseUser = { ...this.state.firebaseUser };
    //if there are no users
    if (customers !== undefined || customers.length !== 0) {
      const currentCustomer = customers.filter(customerObject => customerObject.firebaseId === firebaseUser.uid);
      if (currentCustomer.length === 0) {
        this.createNewCustomer();
      }
    }
  }

  getCustomerInfoFromFb = () => {
    const fireUser = authRequests.getCurrentUser();
    this.setState({
      firebaseUser: fireUser
    });
  }

  createNewCustomer = () => {
    const { firebaseUser } = this.state;
    const newCustomer = { ...this.state.newCustomer };
    newCustomer.displayName = firebaseUser.providerData[0].displayName;
    newCustomer.email = firebaseUser.providerData[0].email;
    newCustomer.firebaseId = firebaseUser.uid;
    this.setState({ newCustomer: defaultCustomer });
    this.addCustomer(newCustomer);
  }

  addCustomer = (newCustomer) => {
    customerRequests.createCustomer(newCustomer).then(() => {
    }).catch(err => console.error('error in adding customer', err));
  }

  render() {
    return (
      <div className='validCustomer' >
        
        <div className="loginBoarder">
          <div className="text-center">
            <p className="loginText text-center">
              </p>
              <p>
              </p>
            <NavLink className=" loginText2 btn" onClick={this.authenticateUser}><img src="https://github.com/ke4tri/Images/blob/master/GetStartedButton.png?raw=true" /></NavLink>
          </div>
        </div>
       
      </div>
    );
  }
}

export default ValidCustomer;

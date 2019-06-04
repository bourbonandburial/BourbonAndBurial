import React from 'react';
import { NavLink } from 'reactstrap';
import authRequests from '../../helpers/data/authRequests';
import customerRequests from '../../helpers/data/customerRequests'

const defaultCustomer = {
  customerId: 0,
  displayName: '',
  email: '',
  firebaseId: '',
  isActive: true,
}

class CustomerProfile extends React.Component {
  state = {
    currentCustomer: [],
    newCustomer: defaultCustomer,
    firebaseUser: {},
    customerObject: {},
  }

  // customerValidation = () => {
  //   const customers = this.state.customers;
  //   const uid = authRequests.getCurrentUid();
  //   const currentCustomer = []
  //   if (customers != undefined) {
  //     currentCustomer = customers.filter(customer => customer.firebaseId === uid);
  //   }
  //   if (currentCustomer.length !== 0) {
  //     this.props.history.push('/home');
  //   } else {
  //     this.setState({ currentCustomer });
  //   }
  // }

  componentDidMount() {
    // getting customer info from firebase
    const fbUser = authRequests.getCurrentUser();
    customerRequests.getSingleCustomer(fbUser.uid).then((currentCustomer) => {
      console.log(currentCustomer);
      this.setState({
        customerObject: currentCustomer,
        firebaseUser: fbUser.providerData[0],
      });
    });
  }

  render() {
    const { customerObject } = this.state;

    return (
      <div className='Customer-Profile'>
        <NavLink className="text-muted">{customerObject.displayName}</NavLink>
      </div>
    );
  }
}

export default CustomerProfile;

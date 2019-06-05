import React from 'react';
import { NavLink } from 'reactstrap';
import authRequests from '../../helpers/data/authRequests';
import customerRequests from '../../helpers/data/customerRequests'

class CustomerProfile extends React.Component {
  // state = {
  //   currentCustomer: [],
  //   newCustomer: defaultCustomer,
  //   firebaseUser: {},
  //   customerObject: {},
  // }

  // getCustomers() {
  //   customerRequests.getAllCustomers().then((results) => {
  //     // const data = results.data;
  //     const customers = results.data;
  //     this.customerValidation(customers);
  //     // this.setState({ customers: data });
  //   }).catch(err => console.error('error in getAllCustomers', err));
  // }

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

    // authenticateUser = (e) => {
  //   e.preventDefault();
  //   authRequests.googleAuth().then(() => {
  //     this.getAllCustomers();
  //   }).catch(err => console.error('error in authenticateUser function', err));
  // }

  // componentDidMount(){
  //   const fUser = authRequests.getCurrentUser();
  //   customerRequests.getSingleCustomer(fUser.uid).then((currentCustomer) => {
  //     console.log(currentCustomer);
  //     this.setState({
  //       customerObject: currentCustomer,
  //       firebaseUser: fUser.providerData[0],
  //     });
  //   });
  // }

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

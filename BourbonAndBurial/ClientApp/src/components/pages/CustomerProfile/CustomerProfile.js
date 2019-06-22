import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../helpers/data/authRequests';
import customerRequests from '../../../helpers/data/customerRequests';
import './CustomerProfile.scss';

class CustomerProfile extends React.Component {
  state = {
    firebaseUser: {},
    customerObject: {},
  }

  // static propTypes = {
  //   customerOject: PropTypes.object,
  // }

  componentDidMount() {
    const customerFbId = authRequests.getCurrentUser().uid;
    customerRequests.getSingleCustomer(customerFbId).then((customer) => {
      this.setState({
        customerObject: customer,
      });
    });
  }

  render() {
    const { customerObject } = this.state;

    const displayAddress = () => {
      if (customerObject.address2 === null) {
        return `${customerObject.address1}, ${customerObject.city}, ${customerObject.state} ${customerObject.zipcode}`;
      } else {
        return `${customerObject.address1}, ${customerObject.address2}, ${customerObject.city}, ${customerObject.state} ${customerObject.zipcode}`;
      }

    }
    return (
      <div className='CustomerProfile'>
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-4">
              <div className="card">
                <img className="card-img-top img-circle rounded-circle" src={customerObject.photo} alt="profile-pic"></img>
                <div className="card-block">
                  <h4 className="card-title mt-2">{customerObject.displayName}</h4>
                  <p className="card-position">
                    <i className="material-icons">place</i>{displayAddress()}
                  </p>
                  <p className="card-position">
                    <i className="material-icons">phone</i>{customerObject.phoneNumber}
                  </p>
                  <div className="card-footer">
                    <button type="button" className="btn btn-link profile-edit"><i className="material-icons">edit</i></button>
                    <button type="button" className="btn btn-link profile-payment"><i className="material-icons">credit_card</i></button>
                    <button type="button" className="btn btn-link profile-delete"><i className="material-icons">delete</i></button>
                  </div>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover table-light mt-5">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Order Date</th>
                  <th>Items</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Net Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Jun 15, 2017</td>
                  <td><a href="#"><img src="/examples/images/avatar/1.jpg" className="avatar" alt="Avatar"></img></a></td>
                  <td>London</td>
                  <td><span className="status text-success">&bull;</span> Delivered</td>
                  <td>$254</td>
                  <td><a href="#" className="view" title="View Details" data-toggle="tooltip"><i className="material-icons">&#xE5C8;</i></a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerProfile;

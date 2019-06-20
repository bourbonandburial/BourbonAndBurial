import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../helpers/data/authRequests';
import customerRequests from '../../../helpers/data/customerRequests';
import './CustomerProfile.scss';

class CustomerProfile extends React.Component {
  state = {
    firebaseUser: {},
  }

  static propTypes = {
    currentCustomer: PropTypes.object,
  }

  // componentDidMount() {
  //   const customerFromFb = authRequests.getCurrentUser();
  // }

  render() {
    const { currentCustomer } = this.props;

    const displayAddress = () => {
      if (currentCustomer.address2 === null) {
        return `${currentCustomer.address1}, ${currentCustomer.city}, ${currentCustomer.state} ${currentCustomer.zipcode}`;
      } else {
        return `${currentCustomer.address1}, ${currentCustomer.address2}, ${currentCustomer.city}, ${currentCustomer.state} ${currentCustomer.zipcode}`;
      }

    }
    return (
      <div className='CustomerProfile container'>
        <div className="row text-center">
          <div className="col-lg-4">
            <div className="card">
              <img className="card-img-top img-circle rounded-circle" src={currentCustomer.photo} alt="profile-pic"></img>
              <div className="card-block">
                <h4 className="card-title mt-2">{currentCustomer.displayName}</h4>
                <p className="card-position">
                  <i className="material-icons">place</i>{displayAddress()}
                </p>
                <p className="card-position">
                  <i className="material-icons">phone</i>{currentCustomer.phoneNumber}
                </p>
                <div className="card-footer">
                  <button type="button" className="btn btn-link profile-edit"><i className="material-icons">edit</i></button>
                  <button type="button" className="btn btn-link profile-payment"><i className="material-icons">credit_card</i></button>
                  <button type="button" className="btn btn-link profile-delete"><i className="material-icons">delete</i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerProfile;


import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../../helpers/data/authRequests';
import './Auth.scss';

class Auth extends React.Component {
  state = {
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

  authenticateUser = () => {
    authRequests.googleAuth().then(() => {
    }).catch(err => console.error('error in authenticateUser function', err));
  }

  render() {

    return (
      <div className='Auth'>
        <div className="loginBoarder">
          <div className="text-center">
            <p className="loginText text-center"></p>
            <div onClick={this.authenticateUser} className="loginText2 btn"><img src="https://github.com/ke4tri/Images/blob/master/GetStartedButton.png?raw=true" alt="bourbon-img" /></div>
            <div className="grave homeImage"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;

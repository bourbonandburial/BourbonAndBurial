import React from 'react';
import './Auth.scss';
import PropTypes from 'prop-types';

class Auth extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    logoutClickEven: PropTypes.func,
  }

  render() {
    return (
      <div className='Auth'>
          <div className="grave parallax"></div>
      </div>
    );
  }
}

export default Auth;

import React from 'react';
import PackageOne from '../PackageOne/PackageOne';
import PropTypes from 'prop-types';
import './PackageCards.scss';

class PackageCards extends React.Component {
  static propTypes = {
 
    setSelectedPackage:PropTypes.func
 }

  // state = {
  //   packages: []
  // };

  render() {
    
    return (
      <div>
        <div>
          <PackageOne setSelectedPackage={this.props.setSelectedPackage}/>
        </div>
    </div>
    );
  }
}

export default PackageCards;
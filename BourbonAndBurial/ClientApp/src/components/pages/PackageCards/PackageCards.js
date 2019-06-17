import React from 'react';
import PackageOne from '../PackageOne/PackageOne';
import './PackageCards.scss';

class PackageCards extends React.Component {
  

  render() {
    return (
      <div>
        <div>
          <PackageOne />
        </div>
    </div>
    );
  }
}

export default PackageCards;
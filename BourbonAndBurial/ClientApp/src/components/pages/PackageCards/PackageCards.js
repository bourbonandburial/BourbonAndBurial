import React from 'react';
import { Col, Row } from 'reactstrap';
import PackageOne from '../PackageOne/PackageOne';
import PackageTwo from '../PackageTwo/PackageTwo';
import PackageThree from '../PackageThree/PackageThree'
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
import React from 'react';
import './Home.scss';
import PackageCards from '../PackageCards/PackageCards'
import productRequests from '../../../helpers/data/productRequests'

class Home extends React.Component {
  state = {
    packageOne: [],
    packageTwo: [],
    packageThree: [],
  }

  displayPackageOneProducts = () => {
    productRequests.getPackageProducts('cremation')
    .then((data) => {
        this.setState({ packageOne: data });
    }).catch(err => console.error('error getting products', err));
}

displayPackageTwoProducts = () => {
  productRequests.getPackageProducts('burial')
  .then((data) => {
      this.setState({ packageTwo: data });
  }).catch(err => console.error('error getting products', err));
}

displayPackageThreeProducts = () => {
  productRequests.getPackageProducts('mausoleum')
  .then((data) => {
      this.setState({ packageThree: data });
  }).catch(err => console.error('error getting products', err));
}

componentDidMount = () => {
  this.displayPackageOneProducts();
  this.displayPackageTwoProducts();
  this.displayPackageThreeProducts();
}

  render() {
    return (
      <div className="home">
        <PackageCards 
        />
      </div>
    );
  }
}

export default Home;

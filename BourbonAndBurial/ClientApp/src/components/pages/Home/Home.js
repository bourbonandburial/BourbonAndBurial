import React from 'react';
import './Home.scss';
import PackageCards from '../PackageCards/PackageCards'
import productRequests from '../../../helpers/data/productRequests'

class Home extends React.Component {
  state = {
    packageOne: [],
    packageTwo: [],
    packageThree: [],
    selectedPackage: []
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

// setSelectedPackage(packageId) {
//   this.setState({selectedPackage: packageId});
//   this.props.history.push('/ALaCarte');
// }

  render() {
    return (
      <div className="home">
        <PackageCards 
        packageOne={this.state.packageOne}
        packageTwo={this.state.packageTwo}
        packageThree={this.state.packageThree}
        setSelectedPackage={this.setSelectedPackage}
        />
      </div>
    );
  }
}

export default Home;

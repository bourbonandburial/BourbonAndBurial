import React from 'react';
import './Home.scss';
import PackageCards from '../PackageCards/PackageCards'
import PropTypes from 'prop-types';



class Home extends React.Component {
  displayName = Home.name
   static propTypes = {
    displayPackageOneProducts:PropTypes.array,
    setSelectedPackage:PropTypes.func
 }

  render() {
    return (
      <div className="home">
        <PackageCards newprop={this.props.displayPackageOneProducts} setSelectedPackage={this.props.setSelectedPackage}/>
      </div>
    );
  }
}

export default Home;

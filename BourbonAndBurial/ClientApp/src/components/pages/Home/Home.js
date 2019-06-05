import React from 'react';
import './Home.scss';
import PackageCards from '../PackageCards/PackageCards'

class Home extends React.Component {
  displayName = Home.name

  render() {
    return (
      <div className="home">
        <PackageCards />
      </div>
    );
  }
}

export default Home;

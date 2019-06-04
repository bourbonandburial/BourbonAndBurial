import React from 'react';

import './Home.scss';
import PackageCards from '../PackageCards/PackageCards'

class Home extends React.Component {
  displayName = Home.name

  render() {
    return (
      <div className="home">
        {/* <h1 className="home">Bourbon and Burial</h1>        */}
        <PackageCards />
      </div>
    );
  }
}

export default Home;

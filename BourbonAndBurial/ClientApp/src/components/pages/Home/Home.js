import React from 'react';
import './Home.scss';

class Home extends React.Component {
  displayName = Home.name

  render() {
    return (
      <div className="home">
        <h1>Bourbon and Burial</h1>       
      </div>
    );
  }
}

export default Home;

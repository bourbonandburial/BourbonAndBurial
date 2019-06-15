import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import './PackageThree.scss';

class PackageThree extends React.Component {

  render() {
    return (
      <div>
       <div className="card" >
        <img className="card-img-top" src="https://github.com/ke4tri/Images/blob/master/tansen-tomb-gwalior-things-to-do.jpg?raw=true" alt="Card image"/>
           <div className="card-img-overlay">
             <h4 className="card-title">Burial</h4>
             <p className="card-text">Price : $1000</p>
             <a href="#" className="btn btn-primary">See Profile</a>
           </div>
         </div>
       </div>
    );
  }
}

export default PackageThree;
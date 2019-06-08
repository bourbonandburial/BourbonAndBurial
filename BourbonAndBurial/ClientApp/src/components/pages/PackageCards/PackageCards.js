import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col, Row } from 'reactstrap';
import PackageOne from '../PackageOne/PackageOne';
import PackageTwo from '../PackageTwo/PackageTwo';
import PackageThree from '../PackageThree/PackageThree'
import './PackageCards.scss';

class PackageCards extends React.Component {
  

  render() {
    return (
      <div>
        <Row>
        <Col sm="4">
          <PackageOne />
      </Col>
      <Col sm="4">
        <PackageTwo />
      </Col>
      <Col sm="4">
        <PackageThree />
      </Col>
      </Row>
    </div>
    );
  }
}

export default PackageCards;
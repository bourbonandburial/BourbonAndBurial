import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col, Row } from 'reactstrap';
import './PackageOne.scss';
//import PackageCards from '../PackageCards/PackageCards'

class PackageOne extends React.Component {
  // displayName = Home.name

  render() {
    return (
      <Card body body inverse style={{ backgroundColor: '#333', borderColor: '#333' }} outline color="success">
      <CardImg top width="50px" src="https://github.com/ke4tri/Images/blob/master/cremation-video.png?raw=true" alt="Card image cap" />
      <CardBody>
        <Card className="text-center">
          <CardTitle className="text-muted">Cremation</CardTitle>
          <CardSubtitle className="text-muted">Price: $300</CardSubtitle>
          <CardText  className="text-muted">A HOT combination of the perfect selections to set your next cremation on FIRE!</CardText>
          <CardText className="text-muted">With Shipping included, you get the following Items :</CardText>
          <CardText className="text-muted">Jack Daniel’s Tennessee Fire QTY : 5 Bottles</CardText>
          <CardText className="text-muted">Red Cups QTY : 5 Bottles</CardText>
          <CardText className="text-muted">Smores kit (Serves 50 ppl) QTY : 5 Bottles</CardText>
          <CardText className="text-muted">EnGRAVED glass QTY : 1 Glass</CardText>
         <Link to='/CremationPackage' className="cremationPackage"><Button>Get Started</Button></Link>
        </Card>
      </CardBody>
    </Card>
    );
  }
}

export default PackageOne;
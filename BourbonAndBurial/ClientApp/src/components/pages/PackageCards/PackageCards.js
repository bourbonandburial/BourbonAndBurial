import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col, Row } from 'reactstrap';
import './PackageCards.scss';

class PackageCards extends React.Component {
  

  render() {
    return (
      <div>
        <Row>
        <Col sm="4">
      <Card body body inverse style={{ backgroundColor: '#333', borderColor: '#333' }} outline color="success">
        <CardImg top width="50px" src="https://github.com/ke4tri/Images/blob/master/cremation-video.png?raw=true" alt="Card image cap" />
        <CardBody>
          <CardTitle>Cremation</CardTitle>
          <CardSubtitle> $300</CardSubtitle>
          <CardText>A HOT combination of the perfect selections to set your next cremation on FIRE!</CardText>
          <Link to='/CremationPackage' className="cremationPackage"><Button>Get Started</Button></Link>
        </CardBody>
      </Card>
      </Col>
      <Col sm="4">
      <Card body outline color="success">
        <CardImg top width="100px" src="https://github.com/ke4tri/Images/blob/master/BudCasket.jpg?raw=true" alt="Card image cap" />
        <CardBody>
          <CardTitle>Burial</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Get Started</Button>
        </CardBody>
      </Card>
      </Col>
      <Col sm="4">
      <Card body inverse color="danger">
        <CardImg top width="100px" src="https://github.com/ke4tri/Images/blob/master/tansen-tomb-gwalior-things-to-do.jpg?raw=true" alt="Card image cap" />
        <CardBody>
          <CardTitle>Mausoleum</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Get Started</Button>
        </CardBody>
      </Card>
      </Col>
      </Row>
    </div>
    );
  }
}

export default PackageCards;
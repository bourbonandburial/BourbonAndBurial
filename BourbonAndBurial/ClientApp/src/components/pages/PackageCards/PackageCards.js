import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col, Row } from 'reactstrap';
import './PackageCards.scss';

class PackageCards extends React.Component {
  // displayName = Home.name

  render() {
    return (
      <div>
        <Row>
        <Col sm="4">
      <Card body>
        <CardImg top width="100px" src="https://github.com/ke4tri/Images/blob/master/BudCasket.jpg?raw=true" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
      </Col>
      <Col sm="4">
      <Card body>
        <CardImg top width="100px" src="https://github.com/ke4tri/Images/blob/master/BudCasket.jpg?raw=true" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
      </Col>
      <Col sm="4">
      <Card body>
        <CardImg top width="100px" src="https://github.com/ke4tri/Images/blob/master/BudCasket.jpg?raw=true" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
      </Col>
      </Row>
    </div>
    );
  }
}

export default PackageCards;
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import './PackageTwo.scss';

class PackageTwo extends React.Component {

  render() {
    return (
      <Card body outline color="success">
        <CardImg top width="100px" src="https://github.com/ke4tri/Images/blob/master/BudCasket.jpg?raw=true" alt="Card image cap" />
        <CardBody>
        <Card className="text-center">
            <CardTitle className="text-muted">Burial</CardTitle>
            <CardSubtitle className="text-muted">Price: $1000</CardSubtitle>
            <CardText  className="text-muted">Lay to rest your worries!! We have you covered, and we don't mean with dirt!</CardText>
            <CardText className="text-muted">Items :</CardText>
            <CardText className="text-muted">Bulleit QTY : 2 Bottles</CardText>
            <CardText className="text-muted">Makers Mark QTY : 2 Bottles</CardText>
            <CardText className="text-muted">Box Cohiloa QTY : 1 Bottles</CardText>
            <CardText className="text-muted">Tray Charcuteri 50ppl QTY : 2 Bottles</CardText>
            <CardText className="text-muted">Clear Plastic Cups QTY : 250</CardText>
            <CardText className="text-muted">EnGRAVED glass QTY : 1 Glass</CardText>
           <Link to='/ALaCarte' className="ALaCarte"><Button>Get Started</Button></Link>
          </Card>
        </CardBody>
      </Card>
    );
  }
}

export default PackageTwo;
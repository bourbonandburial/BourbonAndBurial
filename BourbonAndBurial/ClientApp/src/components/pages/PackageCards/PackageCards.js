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
      </Col>
      <Col sm="4">
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
           <Link to='/BurialPackage' className="burialPackage"><Button>Get Started</Button></Link>
          </Card>
        </CardBody>
      </Card>
      </Col>
      <Col sm="4">
      <Card body inverse color="danger">
        <CardImg top width="100px" src="https://github.com/ke4tri/Images/blob/master/tansen-tomb-gwalior-things-to-do.jpg?raw=true" alt="Card image cap" />
        <CardBody>
        <Card className="text-center">
            <CardTitle className="text-muted">Mausoleum</CardTitle>
            <CardSubtitle className="text-muted">Price: $2999.99</CardSubtitle>
            <CardText  className="text-muted">Keep the party above ground and afloat with our all inclusive Mausoleum option!</CardText>
            <CardText className="text-muted">Items :</CardText>
            <CardText className="text-muted">Booker's QTY : 1 Bottles</CardText>
            <CardText className="text-muted">Blanton's QTY : 1 Bottles</CardText>
            <CardText className="text-muted">Weller 12 yr  QTY : 1 Bottles</CardText>
            <CardText className="text-muted">Willett QTY : 1 Bottle</CardText>
            <CardText className="text-muted">Elijah Craig Barrel  Proof QTY : 1 Bottle</CardText>
            <CardText className="text-muted">Hillrock QTY : 1 Bottle </CardText>
            <CardText className="text-muted">Old Forester 1910 QTY : 1 Bottle</CardText>
            <CardText className="text-muted">Makers Mark Justify QTY : 1 Bottle</CardText>
            <CardText className="text-muted">Knob Creek QTY : 1 Bottle </CardText>
            <CardText className="text-muted">Jefferson's Ocean QTY : 1 Bottle </CardText>
            <CardText className="text-muted">Jack Daniel’s Tennessee Fire QTY : 5 Bottle </CardText>
            <CardText className="text-muted">EnGRAVED Glass QTY : 5 </CardText>
            <CardText className="text-muted">UNLIMITED Glassware</CardText>
            <CardText className="text-muted">Arturo Fuente QTY : 1 </CardText>
            <CardText className="text-muted">H. Upman QTY : 1 </CardText>
            <CardText className="text-muted">Charcuterie Board QTY : 3 </CardText>
            <CardText className="text-muted">Shrimp Cocktails QTY : 6 </CardText>
            <CardText className="text-muted">Pork tenderloin Dinner (serves 200)</CardText>
            <CardText className="text-muted">Dirt Pudding Cups</CardText>
            <CardText className="text-muted">Butler/Server Included</CardText>


           <Link to='/BurialPackage' className="burialPackage"><Button>Get Started</Button></Link>
          </Card>
        </CardBody>
      </Card>
      </Col>
      </Row>
    </div>
    );
  }
}

export default PackageCards;
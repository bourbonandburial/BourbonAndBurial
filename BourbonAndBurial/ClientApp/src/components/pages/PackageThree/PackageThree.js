import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import './PackageThree.scss';

class PackageThree extends React.Component {

  render() {
    return (
     <Card body >
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
    );
  }
}

export default PackageThree;
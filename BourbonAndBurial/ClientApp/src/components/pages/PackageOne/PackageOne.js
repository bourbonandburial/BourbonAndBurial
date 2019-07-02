import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './PackageOne.scss';

class PackageOne extends React.Component {
  static propTypes = {
    setSelectedPackage:PropTypes.func
 }

  render() {
    return (
      <div className="container">
      <div className="row justify-content-around mt-5">
        <div className="col-lg-4 Services-tab item ">
          <div className="packCards folded-corner service_tab_1">
            <div className="text mb-6">
              <i className="fa fa-fire fa-5x fa-icon-image mb-3"></i>
                <div className="item-title">
                    <h3>CREMATION</h3>
                  </div>
              <p>
                With five bottles of Jack Daniels Tennessee Fire, cups, smores kit that service 50 people and 
                one enGRAVED glass of the partings name. 
                This is a HOT combination of the perfect selections to set your next cremation on FIRE! 
              </p>
              <div className="item-title priceTag1 mt-7">
                  <h3> Price : $300</h3>
              </div>
              <div className="icon1" >             
              <button type="button" id="packageOneBtn" className="btn" onClick={this.props.setSelectedPackage} > <i className="fa fa-barcode fa-5x mt-1" aria-hidden="true"></i></button>
               </div>
            </div>
          </div>
          </div>
        <div className="col-lg-4 Services-tab item">
          <div className="packCards folded-corner service_tab_1 ">
            <div className="text mb-2">
              <i className="fa fa-recycle fa-5x fa-icon-image mb-3" ></i>
                <div className="item-title">
                  <h3> BURIAL</h3>
                </div>
                <p>
                With four bottles of our premium bourbons, a box of Chohiloas, Charcuterie 
                tray (serves 50ppl), clear plastic cups and one Engraved glass.
                Lay to rest your worries!! We have you covered, and we don't mean with dirt! 
              </p>
              <div className="item-title priceTag2 mt-2">
                  <h3> Price : $1000</h3>
                </div>
              <div className="icon2">
              <button type="button" id="packageTwoBtn" className="btn" onClick={this.props.setSelectedPackage} > <i className="fa fa-barcode fa-5x mt-1" aria-hidden="true"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 Services-tab item">
          <div className="packCards folded-corner service_tab_1">
            <div className="text mb-6">
              <i className="fa fa-hospital-o fa-5x fa-icon-image mb-3"></i>
                <div className="item-title">
                  <h3> MAUSOLEUM</h3>
                </div>
              <p>
              Fifteen bottles of our top-shelf best blends, five enGRAVED glasses of the deads name
                , Arturo Fuente box, H. Lipman, three Charcuterie Boards, 6 Shrimp cocktails, pork tenderloin dinner serving 200ppl. Don't forget about the Dirt Pudding Cups!
              Keep the party above ground and afloat with our all-inclusive Mausoleum option! 
              </p>
              <div className="item-title priceTag3 mt-2">
                  <h3> Price : $2999</h3>
                </div>
              <div className="icon3">
              <button type="button" id="packageThreeBtn" className="btn" onClick={this.props.setSelectedPackage} > <i className="fa fa-barcode fa-5x mt-1" aria-hidden="true"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default PackageOne;
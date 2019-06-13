import React from 'react';
import './PackageOne.scss';

class PackageOne extends React.Component {

  render() {
    return (
      <div className="container">
      <div className="row justify-content-around">
        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 Services-tab  item">
          <div className="folded-corner service_tab_1">
            <div className="text">
              <i className="fa fa-fire fa-5x fa-icon-image mb-3"></i>
                <p className="item-title">
                    <h3>CREMATION</h3>
                  </p>
              <p>
                This is an amazing set of animated accordions based completely on CSS. They come oriented both vertically and horizontally in order to fit properly in your project. In order to see the slides, 
              </p>
            </div>
          </div>
          </div>
        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 Services-tab item">
          <div className="folded-corner service_tab_1">
            <div className="text">
              <i className="fa fa-recycle fa-5x fa-icon-image mb-3" ></i>
                <p className="item-title">
                  <h3> BURIAL</h3>
                </p>
                <p>
                  This is an amazing set of animated accordions based completely on CSS. They come oriented both vertically and horizontally in order to fit properly in your project. In order to see the slides, 
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 Services-tab item">
          <div className="folded-corner service_tab_1">
            <div className="text">
              <i className="fa fa-hospital-o fa-5x fa-icon-image mb-3"></i>
                <p className="item-title">
                  <h3> MAUSOLEUM</h3>
                </p>
              <p>
                This is an amazing set of animated accordions based completely on CSS. They come oriented both vertically and horizontally in order to fit properly in your project. In order to see the slides, 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default PackageOne;
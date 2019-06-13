import React from 'react';
// import { Link } from 'react-router-dom';
// import { Card, CardImg, CardText, CardBody,
//   CardTitle, CardSubtitle, Button } from 'reactstrap';

import './PackageOne.scss';

class PackageOne extends React.Component {

  render() {
    return (
      
      <div class="container">
      <div class="row justify-content-around">
      
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 Services-tab  item">
          <div class="folded-corner service_tab_1">
            <div class="text">
              <i class="fa fa-fire fa-5x fa-icon-image"></i>
                <p class="item-title">
                    <h3>CREMATION</h3>
                  </p>
              <p>
                This is an amazing set of animated accordions based completely on CSS. They come oriented both vertically and horizontally in order to fit properly in your project. In order to see the slides, 
              </p>
            </div>
          </div>
          </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 Services-tab item">
          <div class="folded-corner service_tab_1">
            <div class="text">
              <i class="fa fa-recycle fa-5x fa-icon-image" ></i>
                <p class="item-title">
                  <h3> BURIAL</h3>
                </p>
                <p>
                  This is an amazing set of animated accordions based completely on CSS. They come oriented both vertically and horizontally in order to fit properly in your project. In order to see the slides, 
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 Services-tab item">
          <div class="folded-corner service_tab_1">
            <div class="text">
              <i class="fa fa-hospital-o fa-5x fa-icon-image"></i>
                <p class="item-title">
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
    
  
    //  <div>
    //   <div className="card" >
    //    <img className="card-img-top" src="https://github.com/ke4tri/Images/blob/master/cremation-video.png?raw=true" alt="Card image"/>
    //       <div className="card-img-overlay">
    //         <h4 className="card-title">Cremation</h4>
    //         <p className="card-text">Price : $300</p>
    //         <a href="#" className="btn btn-primary">See Profile</a>
    //       </div>
    //     </div>
    //   </div>
    
    );
  }
}

export default PackageOne;
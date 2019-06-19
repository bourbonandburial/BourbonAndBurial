import React from 'react';
import './SinglePackage.scss';
import productRequests from '../../../helpers/data/productRequests'

class SinglePackage extends React.Component{
    
    render(){
        return(
          <div className="list-group d-flex justify-content-end">
            <div className="packagesRender">
              <li class="alaWrappingDiv list-group-item align-items-center">
              {this.props.productName}
              <span class="badge badge-primary badge-pill">{this.props.quantity} </span>
              </li>
            </div>
          </div>
        );
    }
}

export default SinglePackage;
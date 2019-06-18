import React from 'react';
import './SinglePackage.scss';
import productRequests from '../../../helpers/data/productRequests'

class SinglePackage extends React.Component{
    
    render(){
        return(
          <div className="singlePackage">
            <div className="text">
             <div className="item-title">
             <img className="zcard-img-top border" src={this.props.image} alt="Card image" /> 
                    <h4 className="xxx">{this.props.productName}</h4>
                  </div>
              <p> X {this.props.quantity} </p>
            </div>
          </div>
        );
    }
}

export default SinglePackage;
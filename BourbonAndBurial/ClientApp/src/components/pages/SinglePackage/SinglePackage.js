import React from 'react';
import './SinglePackage.scss';

class SinglePackage extends React.Component{
    
    render(){
        return(
         
              <div className="alaWrappingDiv ">
                <p>{this.props.productName}<span className="span">|</span>  </p>  
                {/* {this.props.productName} <span> Qty : </span>
                <span className="badge badge-primary badge-pill">{this.props.quantity} </span> */}
              </div>
          
          // <div className="list-group d-flex justify-content-end">
          //   <div className="packagesRender">
          //     <div className="alaWrappingDiv list-group-item align-items-center">
          //     {this.props.productName} <span> Qty : </span>
          //     <span className="badge badge-primary badge-pill">{this.props.quantity} </span>
          //     </div>
          //   </div>
          // </div>
        );
    }
}

export default SinglePackage;
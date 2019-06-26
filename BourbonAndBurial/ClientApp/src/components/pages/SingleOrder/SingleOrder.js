import React from 'react';
import './SingleOrder.scss';
import { Link } from 'react-router-dom'

class SingleOrder extends React.Component{
    
    render(){
        return(
                <table className="table table-striped table-hover table-light mt-5">
                  <tbody>
                    <tr>
                      <td>{this.props.orderId}</td>
                      <td>{this.props.customerId}</td>
                      <td>{this.props.orderDate}</td>
                      <td>Cremation</td>
                      <td>London</td>
                      <td><span className="status text-success">&bull;</span> Delivered</td>
                      <td>$300</td>
                      <Link
                        to="/profile/:orderId">
                      <td><a href="#" className="view" title="View Details" data-toggle="tooltip"><i className="material-icons">&#xE5C8;</i></a></td> </Link>
                    </tr>
                  </tbody>
                </table>
        );
    }
}

export default SingleOrder;
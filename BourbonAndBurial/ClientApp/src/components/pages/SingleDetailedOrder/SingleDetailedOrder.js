import React from 'react';
import './SingleDetailedOrder.scss';
import Moment from 'react-moment';
import orderProductRequests from '../../../helpers/data/orderProductRequests';

class SingleDetailedOrder extends React.Component{


    render() {
        return (
            <section className="mainArea">
            <article className="card detailedOrderCard--1">
              <a href="#" className="detailedOrderCard_link">
                {this.props.getPackageImage()}
                 <div className="detailedOrderCard__img--hover"></div>
               </a>
              <div className="detailedOrderCard__info">
                <span className="detailedOrderCard__category"> Order #{this.props.orderId}</span>
                <div>
                <span className="detailedOrderCard__category"> Payment Type Id: {this.props.paymentTypeId}</span>
                </div>
                <div>
                <span className="detailedOrderCard__category"> Order Date: <Moment format="MM/DD/YYYY">{this.props.orderDate}</Moment></span>
                </div>
                <div>
                <span className="detailedOrderCard__category"> Package: {this.props.package}</span>
                </div>
                <div>
                <span className="detailedOrderCard__category"> Products: {this.props.productBuilder()}</span>
                </div>
                <div>
                <span className="detailedOrderCard__category"> ${this.props.total} </span>
                </div>
                <span className="detailedOrderCard__by">Delivered to <a href="#" className="detailedOrderCard__author" title="author">Nashville</a></span>
              </div>
            </article> 
              </section>
                );
            }
    }

export default SingleDetailedOrder;
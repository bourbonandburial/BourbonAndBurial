import React from 'react';
import './SingleDetailedOrder.scss';
import Moment from 'react-moment';
import orderProductRequests from '../../../helpers/data/orderProductRequests';

class SingleDetailedOrder extends React.Component{


    render() {
        return (
            <section class="mainArea">
            <article class="card detailedOrderCard--1">
              <div class="detailedOrderCard__img"></div>
              <a href="#" class="detailedOrderCard_link">
              <img className="cardz-img-top border" src={this.props.image} alt="Card image" />

                 <div class="detailedOrderCard__img--hover"></div>
               </a>
              <div class="detailedOrderCard__info">
                
                <span class="detailedOrderCard__category"> Order #{this.props.orderId}</span>
                <div>
                <span class="detailedOrderCard__category"> Payment Type Id: {this.props.paymentTypeId}</span>
                </div>
                <div>
                <span class="detailedOrderCard__category"> Order Date: <Moment format="MM/DD/YYYY">{this.props.orderDate}</Moment></span>
                </div>
                <div>
                <span class="detailedOrderCard__category"> Products: {this.props.productName}</span>
                </div>
                <div>
                <span class="detailedOrderCard__category"> ${this.props.total} </span>
                </div>
                <span class="detailedOrderCard__by">Delivered to <a href="#" class="detailedOrderCard__author" title="author">Nashville</a></span>
              </div>
            </article> 
              </section>
                );
            }
    }

export default SingleDetailedOrder;
import React from 'react';
import './SingleDetailedOrder.scss';
import Moment from 'react-moment';

class SingleDetailedOrder extends React.Component{

    render() {

        return (
            <section class="mainArea">
            <article class="card detailedOrderCard--1">
              <div class="detailedOrderCard__info-hover">
                <svg class="detailedOrderCard__like"  viewBox="0 0 24 24">
                <path fill="#000000" d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
            </svg>
                  <div class="detailedOrderCard__clock-info">
                    <svg class="detailedOrderCard__clock"  viewBox="0 0 24 24"><path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
                    </svg><span class="detailedOrderCard__time">{this.props.orderDate}</span>
                  </div>
                
              </div>
              <div class="detailedOrderCard__img"></div>
              <a href="#" class="detailedOrderCard_link">
                 <div class="detailedOrderCard__img--hover"></div>
               </a>
              <div class="detailedOrderCard__info">
                <span class="detailedOrderCard__category"> Order #{this.props.orderId}</span>
                <div>
                <span class="detailedOrderCard__category"> Payment Type Id: {this.props.paymentTypeId}</span>
                </div>
                <div>
                <span class="detailedOrderCard__category"> Date: <Moment format="YYYY/MM/DD">{this.props.orderDate}</Moment></span>
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
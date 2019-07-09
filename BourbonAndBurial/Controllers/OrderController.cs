using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BourbonAndBurial.Data;
using BourbonAndBurial.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BourbonAndBurial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        readonly OrderRepository _orderRepository;

        public OrderController()
        {
            _orderRepository = new OrderRepository();
        }

        [HttpGet]
        public ActionResult GetAll()
        {
            var orders = _orderRepository.GetAll();
            return Ok(orders);
        }

        [HttpGet("{orderId}")]

        public ActionResult GetSingleOrder(int OrderId)
        {
            var order = _orderRepository.GetSingleOrder(OrderId);

            return Ok(order);
        }

        [HttpGet("customer/{customerId}")]
        public ActionResult GetCustomerOrders(int customerId)
        {
            var customerOrders = _orderRepository.GetCustomerOrders(customerId);

            return Ok(customerOrders);
        }

        [HttpPost]
        public ActionResult AddOrder(CreateOrderRequest createRequest)
        {
            var newOrder = _orderRepository.AddOrder(
                createRequest.CustomerId,
                createRequest.PaymentTypeId,
                createRequest.OrderDate,
                createRequest.Total);

            return Created($"api/product/{newOrder.OrderId}", newOrder);
        }

        //[HttpPost("products/ordered")]
        //public ActionResult AddOrderProduct(CreateOrderRequest createRequest)
        //{
        //    var repository = new OrderRepository();

        //    var newOrder = repository.AddOrderProduct(
        //        createRequest.ProductId,
        //        createRequest.OrderId
        //        );

        //    return Created($"/api/order/{newOrder.OrderId}", newOrder);
        //}


        [HttpDelete("{OrderId}")]

        public ActionResult DeleteOrder(int OrderId)
        {
            _orderRepository.DeleteOrder(OrderId);

            return Ok();
        }

        [HttpPut]

        public ActionResult UpdateOrder(Order order)
        {
            var updatedOrder = _orderRepository.UpdateOrder(order);

            return Ok(updatedOrder);
        }
    }
}

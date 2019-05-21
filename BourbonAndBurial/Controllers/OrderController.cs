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

        [HttpPost]
        public ActionResult AddTarget(CreateOrderRequest createRequest)
        {
            var repository = new OrderRepository();

            var newOrder = repository.AddTarget(
                createRequest.OrderId,
                createRequest.CustomerId,
                createRequest.PaymentTypeId,
                createRequest.OrderDate);

            return Created($"/api/order/{newOrder.Id}", newOrder);
        }
    }
}
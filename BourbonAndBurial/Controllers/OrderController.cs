﻿using System;
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
        public ActionResult AddOrder(CreateOrderRequest createRequest)
        {
            var repository = new OrderRepository();

            var newOrder = repository.AddOrder(
                createRequest.CustomerId,
                createRequest.PaymentTypeId
                );

            return Created($"/api/order/{newOrder.OrderId}", newOrder);
        }

        [HttpGet("orders")]
        public ActionResult GetAll()
        {
            var orders = _orderRepository.GetAll();
            return Ok(orders);
        }

    }
}
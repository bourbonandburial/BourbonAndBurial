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
    public class OrderProductController : ControllerBase
    {
        readonly OrderProductRepository _orderProductRepository;

        public OrderProductController()
        {
            _orderProductRepository = new OrderProductRepository();
        }
        [HttpGet]
        public ActionResult GetAll()
        {
            var orders = _orderProductRepository.GetAll();
            return Ok(orders);
        }

        [HttpPost("addOrderProduct")]

        public ActionResult AddOrderProduct(OrderProduct orderProductObject)
        {
            var newOrderProduct = OrderProductRepository.AddOrderProduct(orderProductObject.ProductId, orderProductObject.OrderId);

            return Created($"api/createdOrderProduct/{newOrderProduct.OrderProductId}", newOrderProduct);
        }


        [HttpDelete("{orderProductId}")]

        public ActionResult DeleteOrderProduct(int orderProductId)
        {
            _orderProductRepository.DeleteOrderProduct(orderProductId);

            return Ok();
        }
    }
}
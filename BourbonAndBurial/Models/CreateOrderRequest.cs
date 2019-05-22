﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BourbonAndBurial.Models
{
    public class CreateOrderRequest
    {
        public int OrderId { get; set; }
        public int CustomerId { get; set; }
        public int PaymentTypeId { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
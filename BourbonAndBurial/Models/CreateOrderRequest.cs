using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BourbonAndBurial.Models
{
    public class CreateOrderRequest
    {
        public int CustomerId { get; set; }
        public int PaymentTypeId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal Total { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BourbonAndBurial.Models
{
    public class CreateOrderProductRequest
    {
        public int ProductId { get; set; }
        public int OrderId { get; set; }
    }
}

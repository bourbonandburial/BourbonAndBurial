using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BourbonAndBurial.Models
{
    public class Order
    {
            public int CustomerId { get; set; }
            public int PaymentTypeId { get; set; }
            public DateTime OrderDate { get; set; }

           // public List<Product> Product { get; set; }

    }
}

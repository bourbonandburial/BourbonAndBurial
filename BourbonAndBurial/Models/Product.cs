using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BourbonAndBurial.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public int ProductTypeId { get; set; }
        public decimal Price { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public int Quantity { get; set; }
        public string Image { get; set; }
    }
}

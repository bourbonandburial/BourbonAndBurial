using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BourbonAndBurial.Models
{
    public class PaymentType
    {
        public int PaymentTypeId { get; set; }
        public string PaymentName { get; set; }
        public int AcctNumber { get; set; }
        public int CustomerId { get; set; }
    }
}

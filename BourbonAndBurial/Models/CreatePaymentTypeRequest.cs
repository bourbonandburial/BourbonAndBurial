using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BourbonAndBurial.Models
{
    public class CreatePaymentTypeRequest
    {
        public string PaymentName { get; set; }
        public Int64 AcctNumber { get; set; }
        public int CustomerId { get; set; }
    }
}

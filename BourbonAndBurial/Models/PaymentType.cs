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
        public string CardName { get; set; }
        public long AcctNumber { get; set; }
        public DateTime ExpDate { get; set; }
        public int CustomerId { get; set; }
        public string CVV { get; set; }
        public bool IsActive { get; set; }
    }
}

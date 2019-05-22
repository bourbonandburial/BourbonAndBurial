using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BourbonAndBurial.Models
{
    public class CreateCustomerRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string Username { get; set; }
        public int FirebaseId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BourbonAndBurial.Models
{
    public class CreateCustomerRequest
    {
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string FirebaseId { get; set; }
        public bool IsActive { get; set; }
    }
}

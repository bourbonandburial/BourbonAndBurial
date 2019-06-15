using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BourbonAndBurial.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string phoneNumber { get; set; }
        public string FirebaseId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zipcode { get; set; }
        public string Photo { get; set; }
        public bool IsActive { get; set; }
        
    }
}

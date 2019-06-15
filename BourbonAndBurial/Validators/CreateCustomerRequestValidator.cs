using BourbonAndBurial.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BourbonAndBurial.Validators
{
    public class CreateCustomerRequestValidator
    {
        public bool Validate(CreateCustomerRequest requestToValidate)
        {
            return (string.IsNullOrEmpty(requestToValidate.Email)
                   || string.IsNullOrEmpty(requestToValidate.FirebaseId)
                   || string.IsNullOrEmpty(requestToValidate.DisplayName)
                   || string.IsNullOrEmpty(requestToValidate.Address1)
                   || string.IsNullOrEmpty(requestToValidate.City)
                   || string.IsNullOrEmpty(requestToValidate.State)
                   || string.IsNullOrEmpty(requestToValidate.Zipcode)
                   || string.IsNullOrEmpty(requestToValidate.PhoneNumber)
                   );
        }
    }
}

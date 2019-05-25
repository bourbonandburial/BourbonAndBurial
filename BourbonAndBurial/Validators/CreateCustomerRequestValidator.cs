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
            return !(string.IsNullOrEmpty(requestToValidate.FirstName)
                   || string.IsNullOrEmpty(requestToValidate.LastName)
                   || string.IsNullOrEmpty(requestToValidate.Username));
        }
    }
}

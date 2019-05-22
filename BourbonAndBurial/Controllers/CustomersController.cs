using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BourbonAndBurial.Data;
using BourbonAndBurial.Validators;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BourbonAndBurial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        readonly CustomerRepository _customerRepository;

        public CustomersController()
        {
            _customerRepository =  new CustomerRepository();
        }

        [HttpGet]
        public ActionResult GetAllCustomers()
        {
            var customers = _customerRepository.GetAll();

            return Ok(customers);
        }
    }
}
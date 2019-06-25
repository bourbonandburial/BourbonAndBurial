using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BourbonAndBurial.Data;
using BourbonAndBurial.Models;
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
        readonly CreateCustomerRequestValidator _validator;

        public CustomersController()
        {
            _customerRepository = new CustomerRepository();
            _validator = new CreateCustomerRequestValidator();
        }

        [HttpGet]
        public ActionResult GetAllCustomers()
        {
            var activeCustomers = _customerRepository.GetAll();

            return Ok(activeCustomers);
        }

        [HttpGet("active")]
        public ActionResult GetActiveCustomers()
        {
            var activeCustomers = _customerRepository.GetAllActive();

            return Ok(activeCustomers);
        }

        [HttpGet("{firebaseId}")]
        public ActionResult GetSingleCustomer(string firebaseId)
        {
            var singleCustomer = _customerRepository.GetSingleCustomer(firebaseId);

            return Ok(singleCustomer);
        }

        [HttpPost]
        public ActionResult AddNewCustomer(CreateCustomerRequest newCustomerObject)
        {
            if (_validator.Validate(newCustomerObject))
            {
                return BadRequest(new { error = "Customer validation failed" });
            }
            var newCustomer = _customerRepository.AddCustomer(newCustomerObject);

            return Ok(newCustomer);
        }

        [HttpDelete("{firebaseId}")]
        public ActionResult UpdateIsActive(string firebaseId)
        {
            _customerRepository.DeleteCustomer(firebaseId);

            return Ok();
        }

        [HttpPut("{firebaseId}/update")]
        public ActionResult UpdateCustomer(string firebaseId, Customer customerToUpdate)
        {
            if (firebaseId != customerToUpdate.FirebaseId)
            {
                return BadRequest(new { error = "Please enter valid customerId" });
            }

            var customer = _customerRepository.UpdateCustomer(customerToUpdate);

            var updatedCustomer = _customerRepository.GetSingleCustomer(customer.FirebaseId);

            return Ok(updatedCustomer);
        }
    }
}
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
        public ActionResult GetActiveCustomers()
        {
            var activeCustomers = _customerRepository.GetAll();

            return Ok(activeCustomers);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleCustomer(int id)
        {
            var singleCustomer = _customerRepository.GetSingleCustomer(id);

            return Ok(singleCustomer);
        }

        [HttpPost]
        public ActionResult AddNewCustomer(CreateCustomerRequest createRequest)
        {
            if (!_validator.Validate(createRequest))
            {
                return BadRequest(new { error = "Customers must have first name, last name, username, and firebaseId" });
            }
            var newCustomer = _customerRepository.AddCustomer(
                createRequest.FirstName,
                createRequest.LastName,
                createRequest.CompanyName,
                createRequest.Username,
                createRequest.FirebaseId
                );

            return Created($"api/customers/{newCustomer.CustomerId}", newCustomer);
        }

        [HttpPut("{customerId}")]
        public ActionResult UpdateIsActive(int customerId)
        {
            _customerRepository.DeleteCustomer(customerId);

            return Ok();
        }

        [HttpPut("update/{customerId}")]
        public ActionResult UpdateCustomer(int customerId, Customer customerToUpdate)
        {
            if (customerId != customerToUpdate.CustomerId)
            {
                return BadRequest(new { error = "Please enter valid customerId" });
            }

            var customer = _customerRepository.UpdateCustomer(customerToUpdate);

            var updatedCustomer = _customerRepository.GetSingleCustomer(customer.CustomerId);

            return Ok(updatedCustomer);
        }
    }
}
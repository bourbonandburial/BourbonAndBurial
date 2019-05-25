using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BourbonAndBurial.Data;
using BourbonAndBurial.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BourbonAndBurial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        readonly PaymentTypeRepository _paymentRepository;

        public PaymentsController()
        {
            _paymentRepository = new PaymentTypeRepository();
        }

        [HttpGet]
        public ActionResult GetAllPayments()
        {
            var allPayments = _paymentRepository.GetAll();

            return Ok(allPayments);
        }

        [HttpPost]
        public ActionResult AddNewCustomer(CreatePaymentTypeRequest createRequest)
        {
            var newPaymentType = _paymentRepository.AddPayment(
                createRequest.PaymentName,
                createRequest.AcctNumber,
                createRequest.CustomerId);

            return Created($"api/payments/{newPaymentType.PaymentTypeId}", newPaymentType);
        }
    }
}
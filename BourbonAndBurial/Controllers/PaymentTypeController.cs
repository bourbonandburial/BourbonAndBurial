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
    [Route("api/payments")]
    [ApiController]
    public class PaymentTypeController : ControllerBase
    {
        readonly PaymentTypeRepository _paymentRepository;

        public PaymentTypeController()
        {
            _paymentRepository = new PaymentTypeRepository();
        }

        [HttpGet("all")]
        public ActionResult GetAllPayments()
        {
            var allPayments = _paymentRepository.GetAll();

            return Ok(allPayments);
        }

        [HttpGet]
        public ActionResult GetAllActivePayments()
        {
            var activePayments = _paymentRepository.GetAllActive();

            return Ok(activePayments);
        }

        [HttpGet("{id}")]
        public ActionResult GetSinglePaymentType(int id)
        {
            var singlePaymentType = _paymentRepository.GetSinglePaymentType(id);

            return Ok(singlePaymentType);
        }

        [HttpPost]
        public ActionResult AddNewPaymentType(CreatePaymentTypeRequest createRequest)
        {
            var newPaymentType = _paymentRepository.AddPayment(
                createRequest.PaymentName,
                createRequest.AcctNumber,
                createRequest.CustomerId);

            return Created($"api/payments/{newPaymentType.PaymentTypeId}", newPaymentType);
        }

        [HttpPut("{paymentTypeId}")]
        public ActionResult UpdateIsActive(int paymentTypeId)
        {
            _paymentRepository.DeletePaymentType(paymentTypeId);

            return Ok();
        }

        [HttpPut]
        public ActionResult UpdatePaymentType(PaymentType paymentToUpdate)
        {
            var paymentType = _paymentRepository.UpdatePaymentType(paymentToUpdate);

            var updatedPaymentType = _paymentRepository.GetSinglePaymentType(paymentToUpdate.PaymentTypeId);

            return Ok(updatedPaymentType);
        }

    }
}
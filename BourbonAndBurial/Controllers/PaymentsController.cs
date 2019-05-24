using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BourbonAndBurial.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BourbonAndBurial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        readonly PaymentRepository _paymentRepository;

        public PaymentsController()
        {
            _paymentRepository = new PaymentRepository();
        }

        [HttpGet]
        public ActionResult GetAllPayments()
        {
            var allPayments = _paymentRepository.GetAll();

            return Ok(allPayments);
        }
    }
}
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
    public class ProductTypeController : ControllerBase
    {
        readonly ProductTypeRepository _productTypeRepository;

        public ProductTypeController()
        {
            _productTypeRepository = new ProductTypeRepository();
        }

        [HttpPost]

        public ActionResult<int> AddProductType(CreateProductTypeRequest createRequest)
        {
            var newProductType = _productTypeRepository.AddProductType(createRequest.Category);

            return Created($"api/productType/{newProductType.ProductTypeId}", newProductType);
        }

        [HttpPut]

        public ActionResult UpdateProduct(ProductType productType)
        {
            var updatedProductType = _productTypeRepository.UpdateProductType(productType);

            return Ok(updatedProductType);
        }

        [HttpDelete("{ProductTypeId}")]

        public ActionResult DeleteProductType(int ProductTypeId)
        {
            _productTypeRepository.DeleteProductType(ProductTypeId);

            return Ok();
        }
    }
}
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
    public class ProductController : ControllerBase
    {
        readonly ProductRepository _productRepository;

        public ProductController()
        {
            _productRepository = new ProductRepository();
        }

        [HttpPost] 

        public ActionResult<int> AddProduct(CreateProductRequest createRequest)
        {

            var newProduct = _productRepository.AddProduct(createRequest.ProductTypeId, createRequest.Price, createRequest.ProductName, createRequest.ProductDescription, createRequest.Quantity);

            return Created($"api/product/{newProduct.ProductId}", newProduct);
        }
    }
}
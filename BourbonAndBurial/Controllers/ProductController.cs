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
            var newProduct = _productRepository.AddProduct(createRequest.ProductTypeId, createRequest.Price, createRequest.ProductName, createRequest.ProductDescription, createRequest.Quantity, createRequest.Image);

            return Created($"api/product/{newProduct.ProductId}", newProduct);
        }

        [HttpPut]

        public ActionResult UpdateProduct(Product product)
        {
            var updatedProduct = _productRepository.UpdateProduct(product);

            return Ok(updatedProduct);
        }

        [HttpDelete("{ProductId}")]

        public ActionResult DeleteProduct(int ProductId)
        {
            _productRepository.DeleteProduct(ProductId);

            return Ok();
        }

        [HttpGet]

        public ActionResult GetAllProducts()
        {
            var products = _productRepository.GetAll();

            return Ok(products);
        }

        [HttpGet("Cremation")]

        public ActionResult GetAllCremationProducts()
        {
            var products = _productRepository.GetAllCremationProducts();

            return Ok(products);
        }

        [HttpGet("Burial")]

        public ActionResult GetAllBurialProducts()
        {
            var products = _productRepository.GetAllBurialProducts();

            return Ok(products);
        }

        [HttpGet("Mausoleum")]

        public ActionResult GetAllMausoleumProducts()
        {
            var products = _productRepository.GetAllMausoleumProducts();

            return Ok(products);
        }

        [HttpGet("{productId}")]

        public ActionResult GetSingleProduct(int ProductId)
        {
            var product = _productRepository.GetSingleProduct(ProductId);

            return Ok(product);
        }
    }
}
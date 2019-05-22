using BourbonAndBurial.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace BourbonAndBurial.Data
{
    public class ProductRepository
    {
        const string ConnectionString = "Server=localhost; Database=BourbonAndBurial; Trusted_Connection=True;";

        public Product AddProduct(int ProductTypeId, int Price, string ProductName, string ProductDescription, int Quantity)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var newProduct = db.QueryFirstOrDefault<Product>(@"
                    Insert into Product (productTypeId,price,productName,productDescription,quantity) 
                    Output inserted.*
                    Values(@productTypeId,@price,@productName,@productDescription,@quantity)",
                    new { ProductTypeId, Price, ProductName, ProductDescription, Quantity }); // setting up the parameters required - property needs to match the values above

                if (newProduct != null)
                {
                    return newProduct;
                }
            }

            throw new Exception("No product created");
        }

        public Product UpdateProduct (Product productToUpdate)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var rowsAffected = db.Execute("Update Product " +
                    "Set quantity = @quantity " +
                    "where productId = @productId", productToUpdate);

                if (rowsAffected == 1)
                    return productToUpdate;
            }
            throw new Exception("Didn't update product");
        }

        public void DeleteProduct(int ProductId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var rowsAffected = db.Execute("Delete from Product where ProductId = @ProductId", new { ProductId });

                if (rowsAffected != 1)
                {
                    throw new Exception("Didn't do right");
                }
            }
        }

        public IEnumerable<Product> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var Products = db.Query<Product>("Select * from Product").ToList();

                return Products;
            }
        }
    }
}

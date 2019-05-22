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
    }
}

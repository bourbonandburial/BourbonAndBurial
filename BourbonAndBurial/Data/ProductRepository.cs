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

        public Product AddProduct(int ProductTypeId, decimal Price, string ProductName, string ProductDescription, int Quantity, string Image)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var newProduct = db.QueryFirstOrDefault<Product>(@"
                    Insert into Products (productTypeId,price,productName,productDescription,quantity,image) 
                    Output inserted.*
                    Values(@productTypeId,@price,@productName,@productDescription,@quantity,@image)",
                    new { ProductTypeId, Price, ProductName, ProductDescription, Quantity, Image }); // setting up the parameters required - property needs to match the values above

                if (newProduct != null)
                {
                    return newProduct;
                }
            }

            throw new Exception("No product created");
        }

        public int UpdateProduct (Product productToUpdate)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var rowsAffected = db.Execute("Update Products " +
                    "Set quantity = @quantity " +
                    "where productId = @productId", productToUpdate);

                if (rowsAffected == 1)
                    return productToUpdate.Quantity;
            }
            throw new Exception("Didn't update product");
        }

        public void DeleteProduct(int ProductId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var rowsAffected = db.Execute("Delete from Products where ProductId = @ProductId", new { ProductId });

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
                var Products = db.Query<Product>("Select * from Products").ToList();

                return Products;
            }
        }

        public IEnumerable<Product> GetAllCremationProducts()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var Products = db.Query<Product>("select * from Products" +
                                " where Price < 35" +
                                " or productTypeId = 3").ToList();

                return Products;
            }
        }

        public IEnumerable<Product> GetAllBurialProducts()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var Products = db.Query<Product>(@"select * from Products
                            where Price between 34 and 38
                            or productName = 'Charcuterie Board'
                            or productName = 'Clear Plastic Tumblers'
                            or productName = 'Cohiba Cigars'
                            or productName = 'Engraved Glass'").ToList();

                return Products;
            }
        }
    }
}

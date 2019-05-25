using BourbonAndBurial.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace BourbonAndBurial.Data
{
    public class ProductTypeRepository
    {
        const string ConnectionString = "Server=localhost; Database=BourbonAndBurial; Trusted_Connection=True;";

        public ProductType AddProductType(string Category)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var newProductType = db.QueryFirstOrDefault<ProductType>(@"
                    Insert into ProductTypes (category) 
                    Output inserted.*
                    Values(@category)",
                    new { Category });

                if (newProductType != null)
                {
                    return newProductType;
                }
            }

            throw new Exception("No product type created");
        }

        public string UpdateProductType(ProductType productTypeToUpdate)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var rowsAffected = db.Execute("Update ProductTypes " +
                    "Set category = @category " +
                    "where productTypeId = @productTypeId ", productTypeToUpdate);

                if (rowsAffected == 1)
                    return productTypeToUpdate.Category;
            }
            throw new Exception("Didn't update product type");
        }

        public void DeleteProductType(int ProductTypeId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var rowsAffected = db.Execute("delete from productTypes where ProductTypeId = @ProductTypeId", new { ProductTypeId });

                if (rowsAffected != 1)
                {
                    throw new Exception("Didn't do it right");
                }
            }
        }

        public IEnumerable<ProductType> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var ProductTypes = db.Query<ProductType>("Select * from ProductTypes").ToList();

                return ProductTypes;
            }
        }
    }
}

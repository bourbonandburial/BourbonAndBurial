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
                    Insert into ProductType (category) 
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

        public void DeleteProductType(int ProductTypeId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var rowsAffected = db.Execute("delete from productType where ProductTypeId = @ProductTypeId", new { ProductTypeId });

                if (rowsAffected != 1)
                {
                    throw new Exception("Didn't do it right");
                }
            }
        }
    }
}

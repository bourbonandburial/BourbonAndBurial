using BourbonAndBurial.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace BourbonAndBurial.Data
{
    public class CustomerRepository
    {
        const string ConnectionString = "Server = localhost; Database = BourbonAndBurial; Trusted_Connection = True;";

        public IEnumerable<Customer> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var getQuery = "SELECT customerId, firstname, lastName, companyName, username, firebaseId FROM customer";

                var customers = db.Query<Customer>(getQuery).ToList();

                return customers;
            }
        }
    }
}

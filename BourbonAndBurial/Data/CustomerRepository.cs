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
                var getQuery = "SELECT customerId, firstname, lastName, companyName, username, firebaseId FROM customers";

                var customers = db.Query<Customer>(getQuery).ToList();

                return customers;
            }
        }

        public IEnumerable<Customer> GetSingleCustomer(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var getQuery = "SELECT * FROM customers WHERE customerId = @customerId";

                var parameter = new { CustomerId = id };

                var customers = db.Query<Customer>(getQuery, parameter).ToList();

                return customers;
            }
        }

        public Customer AddCustomer(string firstName, string lastName, string companyName, string username, int firebaseId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var customerRepo = new CustomerRepository();

                var insertQuery = @"
                    INSERT INTO customers
                               ([FirstName]
                               ,[LastName]
                               ,[CompanyName]
                               ,[Username]
                               ,[FirebaseId])
                    OUTPUT inserted.*
                         VALUES
                               (@firstName
                               ,@lastName
                               ,@companyName
                               ,@username
                               ,@firebaseId)";

                var parameters = new
                {
                    FirstName = firstName,
                    LastName = lastName,
                    CompanyName = companyName,
                    Username = username,
                    FirebaseId = firebaseId,
                };

                var newCustomer = db.QueryFirstOrDefault<Customer>(insertQuery, parameters);

                if (newCustomer != null)
                {
                    return newCustomer;
                }
            }
            throw new Exception("Customer was not created");
        }

        public void DeleteCustomer(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var delete = "DELETE FROM Customers WHERE CustomerId = @customerId";

                var parameter = new { CustomerId = id };

                var rowsAffected = db.Execute(delete, parameter);

                if (rowsAffected != 1)
                {
                    throw new Exception("Customer was not deleted");
                }
            }
        }

        public Customer UpdateCustomer(Customer customerToUpdate)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var updateQuery = @"UPDATE customers
                                    SET firstName = @firstName,
                                        lastName = @lastName,
                                        companyName = @companyName,
                                        username = @username
                                    WHERE customerId = @customerId";

                var rowsAffected = db.Execute(updateQuery, customerToUpdate);

                if (rowsAffected == 1)    
                    return customerToUpdate;

            }
            throw new Exception("Customer was not updated");
        }
    }
}

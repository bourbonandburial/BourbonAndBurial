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
                var getQuery = "SELECT * FROM customers WHERE isactive = 1";

                var customers = db.Query<Customer>(getQuery).ToList();

                return customers;
            }
        }

        public IEnumerable<Customer> GetSingleCustomer(string firebaseId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var getQuery = "SELECT * FROM customers WHERE firebaseId = @firebaseId";

                var parameter = new { FirebaseId = firebaseId };

                var customers = db.Query<Customer>(getQuery, parameter).ToList();

                return customers;
            }
        }

        public Customer AddCustomer(CreateCustomerRequest newCustomerObject)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var customerRepo = new CustomerRepository();

                var insertQuery = @"
                    INSERT INTO customers
                               ([DisplayName]
                               ,[Email]
                               ,[FirebaseId]
                               ,[IsActive]
                               ,[Address1]
                               ,[Address2]
                               ,[City]
                               ,[State]
                               ,[Zipcode]
                               ,[Photo]
                               ,[PhoneNumber])
                    OUTPUT inserted.*
                         VALUES
                               (@DisplayName
                               ,@Email
                               ,@FirebaseId
                               ,@IsActive
                               ,@Address1
                               ,@Address2
                               ,@City
                               ,@State
                               ,@Zipcode
                               ,@Photo
                               ,@PhoneNumber)";

                var parameters = new
                {
                    DisplayName = newCustomerObject.DisplayName,
                    Email = newCustomerObject.Email,
                    FirebaseId = newCustomerObject.FirebaseId,
                    IsActive = newCustomerObject.IsActive,
                    Address1 = newCustomerObject.Address1,
                    Address2 = newCustomerObject.Address2,
                    City = newCustomerObject.City,
                    State = newCustomerObject.State,
                    Zipcode = newCustomerObject.Zipcode,
                    Photo = newCustomerObject.Photo,
                    PhoneNumber = newCustomerObject.PhoneNumber
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
                var terminate = @"UPDATE customers
                                    SET isActive = 0
                                    WHERE customerId = @customerId";

                var parameter = new { CustomerId = id };

                var rowsAffected = db.Execute(terminate, parameter);

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
                                    SET displayName = @displayName,
                                        email = @email
                                    WHERE customerId = @customerId";

                var rowsAffected = db.Execute(updateQuery, customerToUpdate);

                if (rowsAffected >= 1)    
                    return customerToUpdate;

            }
            throw new Exception("Customer was not updated");
        }
    }
}

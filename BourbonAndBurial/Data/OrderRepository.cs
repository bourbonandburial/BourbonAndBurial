﻿using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using System.Threading.Tasks;
using BourbonAndBurial.Models;
using System.Data.SqlClient;

namespace BourbonAndBurial.Data
{
    public class OrderRepository
    {
        const string ConnectionString = "Server=localhost;Database=BourbonAndBurial;Trusted_Connection=True;";

        public Order AddOrder(int customerId, int paymentTypeId, DateTime orderDate, decimal total, string package)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var insertQuery = @"
                        INSERT INTO [dbo].[Orders]
                                   ([CustomerId]
                                   ,[PaymentTypeId]
                                   ,[OrderDate]
                                   ,[Total]
                                   ,[Package])
                        output inserted.*
                             VALUES
                                   (@customerId,
                                    @paymentTypeId,
                                    @orderDate,
                                    @total,
                                    @package)";

                var parameters = new
                {
                    CustomerId = customerId,
                    PaymentTypeId = paymentTypeId,
                    OrderDate = orderDate,
                    Total = total,
                    Package = package
                };

                var newOrder = db.QueryFirstOrDefault<Order>(insertQuery, parameters);

                if (newOrder != null)
                {
                    return newOrder;
                }

                throw new Exception("Could not create order");
            }
        }

        public int UpdateOrder(Order paymentTypeToUpdate)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var rowsAffected = db.Execute("Update [Orders] " +
                    "Set paymentTypeId = @paymentTypeId" +
                    "where orderId = @orderId", paymentTypeToUpdate);

                if (rowsAffected == 1)
                    return paymentTypeToUpdate.PaymentTypeId;
            }
            throw new Exception("Didn't update product");
        }

        public void DeleteOrder(int OrderId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var rowsAffected = db.Execute("Delete from [Orders] where OrderId = @OrderId", new { OrderId });

                if (rowsAffected != 1)
                {
                    throw new Exception("Didn't do right");
                }
            }
        }


        public IEnumerable<Order> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var Orders = db.Query<Order>("Select * from Orders").ToList();

                return Orders;
            }
        }

        public Order GetSingleOrder(int OrderId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var singleOrder = db.QueryFirstOrDefault<Order>(@"
                    Select * From Orders
                    WHERE orderId = @orderid",
                    new { OrderId });

                return singleOrder;
            }
        }

        public IEnumerable<Order> GetCustomerOrders(int CustomerId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var getQuery = "SELECT * FROM orders WHERE customerId = @customerId";

                var parameter = new { customerId = CustomerId };

                var order = db.Query<Order>(getQuery, parameter).ToList();

                return order;
            }
        }



    }
}

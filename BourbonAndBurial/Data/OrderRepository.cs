using System;
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

        public CreateOrderRequest AddOrder(int customerId, int paymentTypeId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var insertQuery = @"
                        INSERT INTO [dbo].[Orders]
                                   ([CustomerId]
                                   ,[PaymentTypeId])
                        output inserted.*
                             VALUES
                                   (@customerId,
                                    @paymentTypeId)";

                var parameters = new
                {
                    CustomerId = customerId,
                    PaymentTypeId = paymentTypeId

                };

                var newTarget = db.QueryFirstOrDefault<CreateOrderRequest>(insertQuery, parameters);

                if (newTarget != null)
                {
                    return newTarget;
                }

                throw new Exception("Could not create target");
            }
        }

        //public CreateOrderRequest AddOrderProduct(int productId, int orderId)
        //{

        //    using (var db = new SqlConnection(ConnectionString))
        //    {

        //        var insertQuery = @"
        //                INSERT INTO [dbo].[OrderProducts]
        //                            ([ProductId]
        //                             ,[OrderId])
        //                     VALUES
        //                           (3,
        //                            1)";

        //        var parameters = new
        //        {
        //            ProductId = productId,
        //            OrderId = orderId,
        //        };

        //        var newTarget = db.QueryFirstOrDefault<CreateOrderRequest>(insertQuery, parameters);

        //        if (newTarget != null)
        //        {
        //            return newTarget;
        //        }

        //        throw new Exception("Could not create target");
        //    }
        //}

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

        public IEnumerable<Order> GetSingleOrder(int OrderId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var getQuery = "SELECT * FROM orders WHERE orderId = @orderId";

                var parameter = new { OrderId = OrderId };

                var order = db.Query<Order>(getQuery, parameter).ToList();

                return order;
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

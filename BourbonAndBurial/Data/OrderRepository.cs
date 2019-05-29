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

        public CreateOrderRequest AddOrderProduct(int productId, int orderId)
        {

            using (var db = new SqlConnection(ConnectionString))
            {
              
                var insertQuery = @"
                        INSERT INTO [dbo].[OrderProducts]
                                    ([ProductId]
                                     ,[OrderId])
                             VALUES
                                   (3,
                                    1)";

                var parameters = new
                {
                    ProductId = productId,
                    OrderId = orderId,
                };

                var newTarget = db.QueryFirstOrDefault<CreateOrderRequest>(insertQuery, parameters);

                if (newTarget != null)
                {
                    return newTarget;
                }

                throw new Exception("Could not create target");
            }
        }

        public IEnumerable<Order> GetAll(int CustomerId)
        {
            using (var db = new SqlConnection(ConnectionString))
                {
                        db.Open();
                        var orders = db.Query<Order>(@"Select * from Orders where customerId = @customerId", new { CustomerId });

                        var orderProducts = db.Query<OrderProduct>(@"
                        Select Products.ProductId ProductId,
                            Products.ProductName ProductName,
                            Quantity,
                            Price,
                            OrderId
                        from OrderProducts
                            join Products 
                                on Products.ProductId = OrderProducts.ProductId
                        where OrderId = @OrderIds",
                            new { orderIds = orders.Select(x => x.CustomerId) });

                        foreach (var order in orders)
                        {
                            order.Products = orderProducts.Where(op => op.OrderId == order.CustomerId);
                        }

                        return orders;
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



    }
}

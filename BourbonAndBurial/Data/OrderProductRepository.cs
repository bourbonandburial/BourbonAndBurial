using BourbonAndBurial.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace BourbonAndBurial.Data
{
    public class OrderProductRepository
    {
        const string ConnectionString = "Server=localhost;Database=BourbonAndBurial;Trusted_Connection=True;";

        public IEnumerable<OrderProduct> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var orderProducts = db.Query<OrderProduct>("Select * from OrderProducts").ToList();

                return orderProducts;
            }
        }

        public IEnumerable<OrderProduct> GetProductDetailsForOrder(int OrderId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var getQuery = @"SELECT *
                                 FROM Products
                                 JOIN OrderProducts on OrderProducts.ProductId = Products.ProductId
                                 WHERE OrderId = @orderId; ";

                var parameter = new { OrderId = OrderId };

                var order = db.Query<OrderProduct>(getQuery, parameter).ToList();

                return order;
            }
        }

        public OrderProduct AddOrderProduct(int orderId, int productId)
        {

            using (var db = new SqlConnection(ConnectionString))
            {

                var newOrderProduct = db.QueryFirstOrDefault<OrderProduct>(@"
                        INSERT INTO OrderProducts(ProductId, OrderId)
                        Output Inserted.*
                        Values(@productId, @orderId)",
                        new {orderId, productId });

                if (newOrderProduct != null)
                {
                    return newOrderProduct;
                }

                throw new Exception("Could not create OrderProduct");
            }
        }


        public void DeleteOrderProduct(int orderProductId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var rowsAffected = db.Execute("Delete from orderProducts where orderProductId = @orderProductId", new { orderProductId });

                if (rowsAffected != 1)
                {
                    throw new Exception("Didn't do right");
                }
            }
        }


        /// This method below is from the fish store repo. Should not actually get anything because we are not adding products this way at the moment. 
        /// However, it does work and could be used as an alternative 

        //public IEnumerable<Order> GetAll(int CustomerId)
        //{
        //    using (var db = new SqlConnection(ConnectionString))
        //    {
        //        db.Open();
        //        var orders = db.Query<Order>(@"Select * from Orders where customerId = @customerId", new { CustomerId });

        //        var orderProducts = db.Query<OrderProduct>(@"
        //                Select Products.ProductId ProductId,
        //                    Products.ProductName ProductName,
        //                    Quantity,
        //                    Price,
        //                    OrderId
        //                from OrderProducts
        //                    join Products 
        //                        on Products.ProductId = OrderProducts.ProductId
        //                where OrderId = @OrderIds",
        //            new { orderIds = orders.Select(x => x.CustomerId) });

        //        foreach (var order in orders)
        //        {
        //            order.Products = orderProducts.Where(op => op.OrderId == order.CustomerId);
        //        }

        //        return orders;
        //    }
        //}
    }
}

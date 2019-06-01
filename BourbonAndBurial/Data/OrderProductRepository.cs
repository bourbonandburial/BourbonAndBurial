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
    }
}

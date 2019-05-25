using BourbonAndBurial.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace BourbonAndBurial.Data
{
    public class PaymentTypeRepository
    {
        const string ConnectionString = "Server = localhost; Database = BourbonAndBurial; Trusted_Connection = True;";

        public IEnumerable<PaymentType> GetAllActive()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var getQuery = "SELECT * FROM PaymentTypes WHERE isactive = 1";

                var payments = db.Query<PaymentType>(getQuery).ToList();

                return payments;
            }
        }

        public IEnumerable<PaymentType> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var getQuery = "SELECT * FROM PaymentTypes";

                var payments = db.Query<PaymentType>(getQuery).ToList();

                return payments;
            }
        }

        public PaymentType AddPayment(string paymentName, long acctNumber, int customerId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var insertQuery = @"
                    INSERT INTO PaymentTypes
                               ([PaymentName],
                               [AcctNumber],
                               [CustomerId])
                    OUTPUT inserted.*
                         VALUES
                               (@paymentName,
                               @acctNumber,
                               @customerId)";

                var parameters = new
                {
                    PaymentName = paymentName,
                    AcctNumber = acctNumber,
                    CustomerId = customerId
                };

                var newPaymentType = db.QueryFirstOrDefault<PaymentType>(insertQuery, parameters);

                if (newPaymentType != null)
                {
                    return newPaymentType;
                }
            }
            throw new Exception("Payment type was not created");
        }

        public IEnumerable<PaymentType> GetSinglePaymentType(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var getQuery = "SELECT * FROM PaymentTypes WHERE PaymentTypeId = @paymentTypeId";

                var parameter = new { PaymentTypeId = id };

                var singlePayment = db.Query<PaymentType>(getQuery, parameter).ToList();

                return singlePayment;
            }
        }

        public void DeletePaymentType(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var terminate = @"UPDATE paymentTypes
                                    SET isActive = 0
                                    WHERE paymentTypeId = @paymentTypeId";

                var parameter = new { paymentTypeId = id };

                var rowsAffected = db.Execute(terminate, parameter);

                if (rowsAffected != 1)
                {
                    throw new Exception("Customer was not deleted");
                }
            }
        }

        public PaymentType UpdatePaymentType(PaymentType paymentTypeToUpdate)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var updateQuery = @"
                    UPDATE PaymentTypes
                        SET paymentName = @paymentName,
	                        acctNumber = @acctNumber,
                            customerId = @customerId
                        WHERE paymentTypeId = @paymentTypeId";

                var rowsAffected = db.Execute(updateQuery, paymentTypeToUpdate);

                if (rowsAffected == 1)
                    return paymentTypeToUpdate;

            }
            throw new Exception("Payment type was not updated");
        }
    }
}

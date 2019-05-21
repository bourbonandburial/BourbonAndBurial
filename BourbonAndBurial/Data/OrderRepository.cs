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

        public CreateOrderRequest AddTarget(string name, string location, FitnessLevel fitnessLevel, int userId)
        {

            const string ConnectionString = "Server=localhost;Database;Trusted_Connection=True;";

            using (var db = new SqlConnection(ConnectionString))
            {
                var insertQuery = @"
                        INSERT INTO [dbo].[Targets]
                                   ([Location]
                                   ,[Name]
                                   ,[FitnessLevel]
                                   ,[UserId])
                        output inserted.*
                             VALUES
                                   (@location
                                   ,@name
                                   ,@fitnessLevel
                                   ,@userId)";

                //var parameters = new
                //{
                //    Name = name,
                //    Location = location,
                //    FitnessLevel = fitnessLevel,
                //    UserId = userId
                //};

                //var newTarget = db.QueryFirstOrDefault<Target>(insertQuery, parameters);

                //if (newTarget != null)
                //{
                //    return newTarget;
                //}

                throw new Exception("Could not create target");
            }
        }

    }
}

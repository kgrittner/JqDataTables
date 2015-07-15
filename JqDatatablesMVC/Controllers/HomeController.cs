using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Web.Script.Serialization;
using SQLHelperClass;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace JqDatatablesMVC.Controllers
{
    public class HomeController : Controller
    {
        string defConStr;



        //
        // GET: /Home/
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult GetAll()
        {
            DataTable dt = getAllDatatable();
            string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Json(json, JsonRequestBehavior.AllowGet);
        }


        public ActionResult GetCustOrders(string custId)
        {
            DataTable dt = getCustOrderData(custId);
            string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return Json(json, JsonRequestBehavior.AllowGet);
        }


        public DataTable getCustOrderData2(string custId)
        {
            List<SqlParameter> prm = new List<SqlParameter>();
            string sql = "SELECT *  FROM Orders WHERE CustomerID=@custId";

            prm.Add(new SqlParameter("@custId", custId));
            defConStr = getConnectionString();
            return SQLHELPER.GetDataTable(sql, defConStr, prm);
        }

        public DataTable getAllDatatable()
        {
            string sql = "SELECT * FROM Customers";
            defConStr = getConnectionString();
            return SQLHELPER.GetDataTable(sql, defConStr);
        }


        public DataTable getCustOrderData(string custId)
        {
            List<SqlParameter> prm = new List<SqlParameter>();
            string sql = "SELECT *  FROM Orders WHERE CustomerID=@custId";

            prm.Add(new SqlParameter("@custId", custId));
            defConStr = getConnectionString();
            return SQLHELPER.GetDataTable(sql, defConStr, prm);
        }




        public static DataTable GetDataTable(string sql, string connString, List<SqlParameter> paramList = null)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {
                    using (SqlCommand cmd = new SqlCommand(sql, conn))
                    {
                        conn.Open();

                        if (paramList != null)
                        {
                            cmd.Parameters.AddRange(paramList.ToArray());
                        }

                        using (SqlDataAdapter da = new SqlDataAdapter())
                        {
                            da.SelectCommand = cmd;
                            DataTable dt = new DataTable();
                            da.Fill(dt);
                            conn.Close();
                            return dt;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
        }









        public string getConnectionString()
        {
            return ConfigurationManager.ConnectionStrings["defaultConnectionString"].ConnectionString;
        }









	}
}
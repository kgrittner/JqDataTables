using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SQLHelperClass;
using System.Configuration;
using Newtonsoft.Json;
using System.Web.Script.Serialization;

namespace JqDataTables
{
    public partial class Default : System.Web.UI.Page
    {
        


        protected void Page_Load(object sender, EventArgs e)
        {
            string connString = getConnectionString();
            string sql = "SELECT * FROM Customers";



        }













        public string getConnectionString()
        {
            try
            {
                return ConfigurationManager.ConnectionStrings["defaultConnectionString"].ConnectionString;
            }
            catch (Exception)
            {
                return null;
                throw;
            }

        }







    }
}
using ServeEaseV3.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServeEaseV3.Controllers
{

    public class BaseController : ApiController
    {
        public static myDacProjectEntities1 db=new myDacProjectEntities1();
        // GET: api/Base
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Base/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Base
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Base/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Base/5
        public void Delete(int id)
        {
        }
    }
}

using ServicesApp.Models;
using System;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace ServicesApp.Controllers
{
    public class {{ServiceName}}ApiController : ApiController
    {
        [HttpGet]
        public string Value()
        {
            return "{{ServiceName}}";
        }
    }
}
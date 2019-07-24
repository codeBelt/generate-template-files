using ServicesApp.Models;
using System;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace ServicesApp.Controllers
{
    public class NewServiceApiController : ApiController
    {
        [HttpGet]
        public string Value()
        {
            return "NewService";
        }
    }
}
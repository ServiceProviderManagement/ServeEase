using ServeEaseV3.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ServeEaseV3.Controllers
{

    [EnableCors("*", "*", "*")]

    public class ServiceProviderController : ApiController
    {
        ServeEaseEntities db =new ServeEaseEntities();


        //// GET: api/ServiceProvider
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET: api/ServiceProvider
        public IHttpActionResult Get()
        {
            var distinctServiceProviders = (
                from sp in db.service_providers
                group sp by sp.profession into professionGroup
                select professionGroup.FirstOrDefault()
            ).ToList();
            return Ok(distinctServiceProviders);
        }

        //Get sp and their details using profession*********************************
        [Route("servease/getserviceproviders")]
        [HttpGet]
        public IHttpActionResult GetSP(string profession)
        {

            /* var query = from service_provider in db.service_providers
                         join user in db.users on service_provider.user_id equals user.user_id
                         where service_provider.profession == profession // Filter by the given profession
                         select new
                         {
                             user_id = service_provider.user_id,
                             sp_id = service_provider.sp_id,
                             first_name = user.first_name,
                             last_name = user.last_name,
                             profession = service_provider.profession,
                             expertise = service_provider.expertise,
                             experience = service_provider.experience,
                             description = service_provider.description,
                             charges = service_provider.charges,
                             profile_pic = service_provider.profile_pic,
                             other_images = service_provider.other_images
                         };

             var averageRating = (double)db.reviews
                 .Where(review => review.sp_id == review.sp_id)
                 .Average(review => review.ratings);*/

            var query = from service_provider in db.service_providers
                        join user in db.users on service_provider.user_id equals user.user_id
                        where service_provider.profession == profession // Filter by the given profession
                        select new
                        {
                            user_id = service_provider.user_id,
                            sp_id = service_provider.sp_id,
                            first_name = user.first_name,
                            last_name = user.last_name,
                            profession = service_provider.profession,
                            expertise = service_provider.expertise,
                            experience = service_provider.experience,
                            description = service_provider.description,
                            charges = service_provider.charges,
                            profile_pic = service_provider.profile_pic,
                            other_images = service_provider.other_images,
                            // Join with reviews and calculate the average rating for each service provider
                            AverageRating = db.reviews
                                .Where(review => review.sp_id == service_provider.sp_id)
                                .Select(review => (double?)review.ratings)
                                .Average()
                        };

            var serviceProviderData = query
            .GroupJoin(
            db.reviews,
            serviceProvider => serviceProvider.sp_id,
            review => review.sp_id,
            (serviceProvider, reviews) => new
            {
                serviceProvider.user_id,
                serviceProvider.sp_id,
                serviceProvider.first_name,
                serviceProvider.last_name,
                serviceProvider.profession,
                serviceProvider.expertise,
                serviceProvider.experience,
                serviceProvider.description,
                serviceProvider.charges,
                serviceProvider.profile_pic,
                serviceProvider.other_images,
                serviceProvider.AverageRating
            }
            );

            var result = serviceProviderData.ToList(); // Use ToList() to get a list of results
                                                       // var spIds = query.Select(item => item.sp_id).ToList();

            if (result.Count > 0)
            {
                return Ok(result);
            }
            else
            {
                return NotFound(); // Or return an appropriate response for no results found
            }
        }
        //************************************
        //Get sp and their details using SPID
        [Route("servease/getSPDtlsBySpId")]
        [HttpGet]
        public IHttpActionResult GetSP(int SPID)
        {

            var query = from service_provider in db.service_providers
                        join user in db.users on service_provider.user_id equals user.user_id
                        where service_provider.sp_id == SPID // Filter by the given SPID
                        select new
                        {
                            user_id = service_provider.user_id,
                            sp_id = service_provider.sp_id,
                            first_name = user.first_name,
                            last_name = user.last_name,
                            profession = service_provider.profession,
                            expertise = service_provider.expertise,
                            experience = service_provider.experience,
                            description = service_provider.description,
                            charges = service_provider.charges,
                            profile_pic = service_provider.profile_pic,
                            other_images = service_provider.other_images,
                            // Join with reviews and calculate the average rating for each service provider
                            AverageRating = db.reviews
                                .Where(review => review.sp_id == service_provider.sp_id)
                                .Select(review => (double?)review.ratings)
                                .Average()
                        };

            var serviceProviderData = query
            .GroupJoin(
            db.reviews,
            serviceProvider => serviceProvider.sp_id,
            review => review.sp_id,
            (serviceProvider, reviews) => new
            {
                serviceProvider.user_id,
                serviceProvider.sp_id,
                serviceProvider.first_name,
                serviceProvider.last_name,
                serviceProvider.profession,
                serviceProvider.expertise,
                serviceProvider.experience,
                serviceProvider.description,
                serviceProvider.charges,
                serviceProvider.profile_pic,
                serviceProvider.other_images,
                serviceProvider.AverageRating
            }
            );

            var result = serviceProviderData.FirstOrDefault();

            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return NotFound(); // Or return an appropriate response for no results found
            }
        }


        //Get sp and their details using id
        //GET: servease/getSPDetails/?id=5
        [Route("servease/getSPDetails")]
        [HttpGet]
        public IHttpActionResult getSPDetails(int id)
        {
            var query = from user in db.users
                        where user.user_id == id
                        join serviceProvider in db.service_providers
                        on user.user_id equals serviceProvider.user_id
                        select new
                        {
                            first_name = user.first_name,
                            last_name = user.last_name,
                            user_id = serviceProvider.user_id,
                            profession = serviceProvider.profession,
                            expertise = serviceProvider.expertise
                        };

            var result = query.FirstOrDefault();

            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return NotFound(); // Or return an appropriate response for no results found
            }
        }





        // GET: api/ServiceProvider/5(userid)
        public IHttpActionResult Get(int id)
        {

            service_providers sp = db.service_providers
                     .Where(service_provider => service_provider.user_id == id)
                     .FirstOrDefault();
            return Ok(sp);
        }

        // POST: api/ServiceProvider
        public void Post([FromBody]string value)
        {
        }

        
        public IHttpActionResult Put(int id, [FromBody] service_providers sp)
        {
            int spId = db.service_providers
                        .Where(service_providers => service_providers.user_id == id)
                        .Select(service_providers => service_providers.sp_id)
                        .FirstOrDefault();


            if (sp == null)
            {
                return BadRequest("user Update Failed!!!");
            }

            service_providers sp1 = db.service_providers.Find(spId);

            try
            {
                sp1.profession = sp.profession;
                sp1.expertise = sp.expertise;
                sp1.experience = sp.experience;
                sp1.description = sp.description;
                sp1.charges= sp.charges;
                sp1.profile_pic = sp.profile_pic;



                db.SaveChanges();
                return Ok("SP Details Updated successfully");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

       

        // DELETE: api/ServiceProvider/5
       Implemented delete functionality for service provider in ServiceProviderController.
    }
}

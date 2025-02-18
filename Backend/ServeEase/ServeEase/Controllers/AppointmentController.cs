using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ServeEaseV3.Models;
using System.Web.Http.Cors;

namespace ServeEaseV3.Controllers
{
    [EnableCors("*", "*", "*")]

    public class AppointmentController : ApiController
    {
        myDacProjectEntities1 db = new myDacProjectEntities1();
        // GET: api/Appointment
        public List<appointment> Get()
        {
            return db.appointments.ToList();
        }

        // GET: api/Appointment/5
        public appointment Get(int id)
        {
            return db.appointments.Find(id);
        }

        // POST: api/Appointment
        public IHttpActionResult Post([FromBody] appointment apt)
        {
            if (apt == null)
            {
                return BadRequest("Failed!!!");
            }

            try
            {//********************************
                apt.cust_id = db.customers
                .Where(customer => customer.user_id == apt.cust_id)
                .Select(customer => customer.cust_id)
                .FirstOrDefault();

                // Assuming you have the UTC order_date
                DateTime utcOrderDate = DateTime.UtcNow;

                // Specify the Indian Standard Time (IST) time zone
                TimeZoneInfo indianTimeZone = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");

                // Convert the UTC time to Indian time zone
                DateTime indianOrderDate = TimeZoneInfo.ConvertTimeFromUtc(utcOrderDate, indianTimeZone);

                // Set the corrected Indian time to the order_date property
                apt.order_date = indianOrderDate;

                db.appointments.Add(apt);
                db.SaveChanges();
                return Ok("Appointment added successfully");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT: api/Appointment/5
        //public IHttpActionResult Put(int id, [FromBody] appointment apt)
        //{
        //    if (apt == null)
        //    {
        //        return BadRequest("Update Failed!!!");
        //    }
        //    appointment apt1 = db.appointments.Find(id);
        //    try
        //    {
        //        // Assuming you have the UTC order_date
        //        DateTime utcOrderDate = DateTime.UtcNow;

        //        // Specify the Indian Standard Time (IST) time zone
        //        TimeZoneInfo indianTimeZone = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");

        //        // Convert the UTC time to Indian time zone
        //        DateTime indianOrderDate = TimeZoneInfo.ConvertTimeFromUtc(utcOrderDate, indianTimeZone);

        //        // Set the corrected Indian time to the order_date property
        //        apt1.order_date = indianOrderDate;

        //        apt1.cust_id = apt.cust_id;
        //        apt1.sp_id = apt1.sp_id;
        //        apt1.ord_description = apt.ord_description;
        //        //apt1.order_date=DateTime.UtcNow;
        //        apt1.apt_date = apt.apt_date;
        //        apt1.apt_status = apt.apt_status;

        //        db.SaveChanges();
        //        return Ok("Address Updated successfully");
        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

        //this is for saving only app status
        [Route("servease/updateAppointmentStatus")]
        [HttpPut]
        public IHttpActionResult UpdateAppointmentStatus(int aptId, string newStatus)
        {
            try
            {
                var appointment = db.appointments.FirstOrDefault(a => a.apt_id == aptId);
                if (appointment != null)
                {
                    appointment.apt_status = newStatus;
                    db.SaveChanges();
                    return Ok("Appointment status updated successfully.");
                }
                else
                {
                    return BadRequest("Appointment not found.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }



        /*[Route("servease/getAptBySpId")]
        [HttpGet]
        public IHttpActionResult FindBySpID(int userId)
        {

            var appointmentsWithProvidersAndUsers = db.appointments
            .Where(appointment => appointment.service_providers.user_id == userId)
            .Join(
                db.service_providers,
                appointment => appointment.sp_id,
                serviceProvider => serviceProvider.sp_id,
                (appointment, serviceProvider) => new
                {
                    Appointment = appointment,
                    ServiceProvider = serviceProvider
                }
            )
            .Join(
                db.users,
                combined => combined.ServiceProvider.user_id,
                user => user.user_id,
                (combined, user) => new
                {
                    combined.Appointment.apt_id,
                    combined.Appointment.sp_id,
                    combined.Appointment.cust_id,
                    combined.Appointment.ord_description,
                    combined.Appointment.order_date,
                    combined.Appointment.apt_date,
                    combined.Appointment.apt_status,
                    combined.ServiceProvider.expertise,
                    combined.ServiceProvider.profile_pic,
                    user.first_name,
                    user.last_name
                }
            )
            .ToList();



            return Ok(appointmentsWithProvidersAndUsers);
        }*/


        [Route("servease/getAptBySpId")]
        [HttpGet]
        public IHttpActionResult FindBySpID(int userId)
        {
            var appointmentsWithProvidersAndUsers = db.appointments
                .Where(appointment => appointment.service_providers.user_id == userId)
                .Join(
                    db.service_providers,
                    appointment => appointment.sp_id,
                    serviceProvider => serviceProvider.sp_id,
                    (appointment, serviceProvider) => new
                    {
                        Appointment = appointment,
                        ServiceProvider = serviceProvider
                    }
                )
                .Join(
                    db.users,
                    combined => combined.ServiceProvider.user_id,
                    user => user.user_id,
                    (combined, user) => new
                    {
                        combined.Appointment.apt_id,
                        combined.Appointment.sp_id,
                        combined.Appointment.cust_id,
                        combined.Appointment.ord_description,
                        combined.Appointment.order_date,
                        combined.Appointment.apt_date,
                        combined.Appointment.apt_status,
                        combined.ServiceProvider.expertise,
                        combined.ServiceProvider.profile_pic,
                        user.first_name,
                        user.last_name
                    }
                )
                .Join(
                    db.customers,
                    combined => combined.cust_id,
                    customer => customer.cust_id,
                    (combined, customer) => new
                    {
                        combined.apt_id,
                        combined.sp_id,
                        combined.cust_id,
                        combined.ord_description,
                        combined.order_date,
                        combined.apt_date,
                        combined.apt_status,
                        combined.expertise,
                        combined.profile_pic,
                        combined.first_name,
                        combined.last_name,
                        customer.user_id // Add user_id from customers
                    }
                )
                .Join(
                    db.users,
                    combined => combined.user_id, // Use user_id from customers
                    user => user.user_id,
                    (combined, user) => new
                    {
                        combined.apt_id,
                        combined.sp_id,
                        combined.cust_id,
                        combined.ord_description,
                        combined.order_date,
                        combined.apt_date,
                        combined.apt_status,
                        combined.expertise,
                        combined.profile_pic,
                        combined.first_name,
                        combined.last_name,
                        customerFirstName = user.first_name, // Alias for customer first_name
                        customerLastName = user.last_name
                        //user.first_name as customer_first_name, // Alias for customer first_name
                        //user.last_name as customer_last_name // Alias for customer last_name
                    }
                )
                .ToList();

            return Ok(appointmentsWithProvidersAndUsers);
        }
       



        // GET:servease/getAptByCustId/?userId=5
        [Route("servease/getAptByCustId")]
        [HttpGet]
        public IHttpActionResult FindByCustID(int userId)
        {

            var appointmentsWithProvidersAndUsers = db.appointments
            .Where(appointment => appointment.customer.user_id == userId)
            .Join(
                db.service_providers,
                appointment => appointment.sp_id,
                serviceProvider => serviceProvider.sp_id,
                (appointment, serviceProvider) => new
                {
                    Appointment = appointment,
                    ServiceProvider = serviceProvider
                }
            )
            .Join(
                db.users,
                combined => combined.ServiceProvider.user_id,
                user => user.user_id,
                (combined, user) => new
                {
                    combined.Appointment.apt_id,
                    combined.Appointment.sp_id,
                    combined.Appointment.cust_id,
                    combined.Appointment.ord_description,
                    combined.Appointment.order_date,
                    combined.Appointment.apt_date,
                    combined.Appointment.apt_status,
                    combined.ServiceProvider.expertise,
                    combined.ServiceProvider.profile_pic,
                    user.first_name,
                    user.last_name
                }
            )
            .ToList();



            return Ok(appointmentsWithProvidersAndUsers);
        }


        // DELETE: api/Appointment/5
        public IHttpActionResult Delete(int id)
        {
            appointment apt1 = db.appointments.Find(id);
            if (apt1 != null)
            {
                db.appointments.Remove(apt1);
                db.SaveChanges();
                return Ok("Appointment Cancelled successfully");
            }
            else
            {
                return BadRequest("Appointment Cancellation Failed");
            }
        }
    }
}

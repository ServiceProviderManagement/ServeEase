using Newtonsoft.Json;
using ServeEaseV3.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Http;
using System.Text;
using System.Web.Http;

using System.Web.Http.Cors;


    


namespace ServeEaseV3.Controllers
{

    [EnableCors("*", "*", "*")]

    /*public class userandaddress
    {
        private user user1 = new user();
        private address address2 = new address();

        public userandaddress( string fname, string fname,) 
        {
            user1.first_name = fname;
        }
    }*/
    public class SignUpController : ApiController
    {
        myDacProjectEntities1 db = new myDacProjectEntities1();
        public static user user1 = new user();
        public static address address2 = new address();
        public int MailedOtp { get; set; }
        public static int Otp { get; set; }
        // GET: api/SignUp
        public IHttpActionResult GetCustomers()
        {
            List<user> allUsers=db.users.ToList();
            return Ok(allUsers);
        }



        // GET: api/SignUp/5
        public user Get(int id)
        {
            return db.users.Find(id);

        }

        private int GenerateOtp()
        {
            Random random = new Random();
            return random.Next(1000, 10000);
        }

        // POST: api/SignUp
        public IHttpActionResult PostCustomer([FromBody] user usr)
        {
            user1 = usr;
            if (user1 == null)
            {
                return BadRequest("Failed!!!");
            }


            #region SenfingMailVerification
            Otp = GenerateOtp();

            

            string smtpServer = "smtp.gmail.com";
            int smtpPort = 587; 
            string fromEmail = "serveeasehomeservices247@gmail.com";
            string emailSubject = "Verification Code from ServEase";
            string smtpPassword = "ilrvaqhwkwhlfvuf";

            // Construct the HTML email body as a string
            string htmlBody = $@"
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                            background-color: #f2f2f2;
                        }}
                        .container {{
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #ffffff;
                        }}
                        h1 {{
                            color: #333;
                        }}
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <h1>Welcome {usr.first_name}</h1>
                        <p> Thank you for using our services. We've shared a one-time verification code for verification purpose.</p>
                       
                        Your OTP: <h1>{Otp}</h1>

                       <p> Kindly use this code to verify your account. If you didn't request this code, please ignore this message. Have a great day!</p>
                       <h3>NOTE:</h3><h6>Please do not share this with anyone!!!</h6>
                    </div>
                </body>
                </html>
                ";
            var smtpClient = new SmtpClient(smtpServer);
            using (smtpClient)
            {
                smtpClient.Port = smtpPort;
                smtpClient.Credentials = new NetworkCredential(fromEmail, smtpPassword); // Replace with your SMTP credentials
                smtpClient.EnableSsl = true; // Use SSL if required

                using (var mailMessage = new MailMessage())
                {
                    mailMessage.From = new MailAddress(fromEmail);
                    mailMessage.To.Add(user1.email);
                    mailMessage.Subject = emailSubject;
                    mailMessage.Body = htmlBody;
                    mailMessage.IsBodyHtml = true; // Set to true to indicate the body is in HTML format

                    try
                    {
                        smtpClient.Send(mailMessage);
                        return Ok("Email sent successfully.");
                    }
                    catch (Exception ex)
                    {
                        return BadRequest("Error sending email: {ex.Message}");
                    }
                }
            }

            #endregion

        }

        [Route("api/saveuser")]
        [HttpGet]
        public IHttpActionResult saveUser(int MailedOtp)
        {
            
            if(Otp == MailedOtp)
            {
                try
                {
                    #region getTime
                    // Assuming you have the UTC order_date
                    DateTime Date = DateTime.UtcNow;

                    // Specify the Indian Standard Time (IST) time zone
                    TimeZoneInfo indianTimeZone = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");

                    // Convert the UTC time to Indian time zone
                    DateTime indianDate = TimeZoneInfo.ConvertTimeFromUtc(Date, indianTimeZone);

                    // Set the corrected Indian time to the order_date property
                    user1.reg_date = indianDate;
                    #endregion
                    /*address ad =new address();
                    address2.user_id = user1.user_id;
                    address2.address1 = ad.address1;
                    address2.city =ad.city;
                    address2.district = ad.district;
                    address2.state = ad.state;
                    address2.pin_code = ad.pin_code;

                    db.addresses.Add(address2);*/

                    db.users.Add(user1);
                    db.SaveChanges();

                    if (user1.role_id == "customer")
                    {
                        customer cst = new customer();
                        var userId = db.users
                        .Where(user => user.email == user1.email)
                        .Select(user => user.user_id)
                        .FirstOrDefault();
                        cst.user_id = userId;
                        db.customers.Add(cst);
                        db.SaveChanges();
                    }
                    else if (user1.role_id == "sp")
                    {
                        service_providers sp = new service_providers();
                        var userId = db.users
                        .Where(user => user.email == user1.email)
                        .Select(user => user.user_id)
                        .FirstOrDefault();

                        sp.user_id = userId;
                        db.service_providers.Add(sp);
                        db.SaveChanges();
                    }

                    return Ok("usr added successfully");
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            }
            else
            {
                return BadRequest("Otp is not matching!!!");
            }
        }
        
        // PUT: api/SignUp/5
        public IHttpActionResult Put(int id, [FromBody] user usr)
        {
            if (usr == null)
            {
                return BadRequest("user Update Failed!!!");
            }
            

            user usr1 = db.users.Find(id);
            try
            {
                usr1.first_name = usr.first_name;
                usr1.last_name = usr.last_name;
                usr1.email = usr.email;
                usr1.mobile = usr.mobile;
                usr1.dob = usr.dob;
                usr1.password = usr.password;

                db.SaveChanges();
                //return Ok("User Updated successfully");
                return Ok(usr);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

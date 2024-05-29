using BackEnd.Data;
using BackEnd.DTO;
using BackEnd.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Threading.Tasks;
using BCrypt.Net;
using Microsoft.Extensions.Configuration;
using BackEnd.Utilities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http.HttpResults;
using static System.Net.WebRequestMethods;
using Microsoft.Extensions.Configuration;



namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly BagShopContext _bagshopContext;
        private readonly IConfiguration _config;
        private readonly EmailSendUtility _emailSendUtility;
        private readonly EmailSendUtilityBan _emailSendUtilityBan;

        public UserController(BagShopContext bagshopContext)
        {
            _bagshopContext = bagshopContext;
            _config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            _emailSendUtility = new EmailSendUtility(_config);
            _emailSendUtilityBan = new EmailSendUtilityBan(_config);

        }

        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser(UserDto userDto)
        {
            try
            {
                // Check if the email already exists
                var existingUser = await _bagshopContext.Users.FirstOrDefaultAsync(u => u.Email == userDto.Email);
                if (existingUser != null)
                {
                    return BadRequest("Email already in use");
                }

                // Hash the password using BCrypt
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(userDto.Password);

                // Mapping UserDto to User entity
                var user = new User
                {
                    Email = userDto.Email,
                    Password = hashedPassword,
                    Name = userDto.Name,
                    Status = "active", // Setting status as active
                    CreatedOn = DateTime.Now // Setting createdOn date as current date time
                };

                _bagshopContext.Users.Add(user);
                await _bagshopContext.SaveChangesAsync();
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                // Log the exception for troubleshooting
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, "An error occurred while saving the user details.");
            }
        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            try
            {
                // Find the user by email
                var user = await _bagshopContext.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
                if (user == null)
                {
                    return Unauthorized("Email or password is incorrect");
                }

                // Verify the password
                bool isPasswordValid = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password);
                if (!isPasswordValid)
                {
                    return Unauthorized("Email or password is incorrect");
                }

                return Ok("Login successful");
            }
            catch (Exception ex)
            {
                // Log the exception for troubleshooting
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, "An error occurred while processing the login request.");
            }
        }


        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            try
            {
                var users = _bagshopContext.Users.ToList();
                return Ok(users);
            }
            catch (Exception ex)
            {
                // Log the exception for troubleshooting
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving the users.");
            }
        }

        [HttpPut("SendEmailVerification")]
        public async Task<IActionResult> SendEmailVerification([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Check if the email already exists
                var existingUser = await _bagshopContext.Users.FirstOrDefaultAsync(u => u.Email == registerDto.Email);
                if (existingUser != null)
                {
                    return BadRequest("Email already in use");
                }

                // Create a random 6-digit OTP
                Random random = new Random();
                int otp = random.Next(100000, 999999);
                string otpString = otp.ToString();

                // Send email
                _emailSendUtility.SendEmail(registerDto, otpString);

                // Return OTP in JSON response
                return Ok(new { otp = otpString });
            }
            catch (Exception ex)
            {
                // Log the exception for troubleshooting
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, "An error occurred while sending the email.");
            }
        }






    }
}

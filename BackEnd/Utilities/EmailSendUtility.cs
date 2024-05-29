using BackEnd.DTO;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace BackEnd.Utilities
{
    public class EmailSendUtility
    {
        private readonly IConfiguration _config;
        public EmailSendUtility(IConfiguration configuration)
        {
            _config = configuration;
        }

        public void SendEmail(RegisterDto registerDto, string otp)
        {
            try
            {
                var emailApiKey = _config["EmailServer:SENDGRID_API_KEY"];
                var client = new SendGridClient(emailApiKey);
                var from = new EmailAddress("nithinjosemandownloadonly@gmail.com", "FormulaOneFanHub");
                var subject = "Your account is created with FormulaOne FanHub: Verify here";
                var to = new EmailAddress(registerDto.Email, registerDto.Name);
                var plainTextContent = otp;
                var htmlContent = $"<strong>Below is your OTP code to Confirm your FormulaOneHub Account: OTP: {plainTextContent}</strong>";
                var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                var response = client.SendEmailAsync(msg).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"An error occurred while sending the email: {ex.Message}");
                throw; // Re-throw the exception to handle it in the calling method
            }
        }
    }
}

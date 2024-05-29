using BackEnd.Entities;
using SendGrid;
using SendGrid.Helpers.Mail;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using BackEnd.Entities;


namespace BackEnd.Utilities
{
    public class EmailSendUtilityActivate
    {
        private readonly IConfiguration _config;

        public EmailSendUtilityActivate(IConfiguration configuration)
        {
            _config = configuration;
        }

        public void SendEmailActivate(User userInfo, string reason)
        {
            try
            {
                var emailApiKey = _config["EmailServer:SENDGRID_API_KEY"];
                var client = new SendGridClient(emailApiKey);
                var from = new EmailAddress("nithinjosemandownloadonly@gmail.com", "FormulaOneFanHub");
                var subject = "Your FormulaOne FanHub Account Has Been Re-Activated";
                var to = new EmailAddress(userInfo.Email, $"{userInfo.Name}");
                var plainTextContent = $"Dear {userInfo.Name},\n\nYour FormulaOne FanHub account has been Re-Activated due to the following reason:\n\n{reason}\n\nPlease contact the administrators for further assistance.\n\nBest regards,\nFormulaOneFanHub Team";
                var htmlContent = $"<p>Dear {userInfo.Name},</p><p>Your FormulaOne FanHub account has been Re-Activated due to the following reason:</p><p><strong>{reason}</strong></p><p>Please contact the administrators for further assistance.</p><p>Best regards,<br />FormulaOneFanHub Team</p>";
                var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                var response = client.SendEmailAsync(msg).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                // Handle the exception (e.g., log it)
            }
        }
    }
}

using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace BackEnd.Entities
{
    public class User
    {
        public int Id { get; set; }
        public required string Password { get; set; } = string.Empty;
        public required string Email { get; set; } = string.Empty;
        public required string Name { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
    }
}

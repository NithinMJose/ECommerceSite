using Microsoft.EntityFrameworkCore;
using BackEnd.Entities;

namespace BackEnd.Data
{
    public class BagShopContext : DbContext
    {
        public BagShopContext(DbContextOptions<BagShopContext> options) : base(options)
        { 
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}

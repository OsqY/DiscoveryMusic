using DiscoveryMusic.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DiscoveryMusic.Data.Database
{
    public class ApplicationDbContext : IdentityDbContext<ApiUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApiUser>().Property(u => u.Initials).HasMaxLength(5);
        }

        public DbSet<Artist> Artists => Set<Artist>();
        public DbSet<Album> Albums => Set<Album>();
        public DbSet<ApiUser> Users => Set<ApiUser>();
        public DbSet<Comment> Comments => Set<Comment>();
        public DbSet<Song> Songs => Set<Song>();
    }
}

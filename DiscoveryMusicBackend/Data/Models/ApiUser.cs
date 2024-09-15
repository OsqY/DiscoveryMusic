using Microsoft.AspNetCore.Identity;

namespace DiscoveryMusic.Data.Models;

public class ApiUser : IdentityUser
{
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    public string? Initials { get; set; }
}

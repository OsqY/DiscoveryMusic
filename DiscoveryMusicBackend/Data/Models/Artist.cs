
using System.ComponentModel.DataAnnotations;

namespace DiscoveryMusic.Data.Models;

public class Artist
{
  [Key]
  [Required]
  public int Id { get; set; }

  public required string Name { get; set; }
  public DateTime Debut { get; set; }

  public string? ImageUrl { get; set; }

  public DateTime CreatedDate { get; set; }
  public DateTime LastModifiedDate { get; set; }

  public ICollection<Album> Albums { get; set; } = new List<Album>();
  public ICollection<Song> Songs { get; set; } = new List<Song>();

}

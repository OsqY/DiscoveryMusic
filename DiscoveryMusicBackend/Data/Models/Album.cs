
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DiscoveryMusic.Data.Models;

public class Album
{

  [Key]
  [Required]
  public int Id { get; set; }

  public required string Name { get; set; }
  public DateTime ReleaseDate { get; set; }

  public string? ImageUrl { get; set; }

  [ForeignKey(nameof(Artist))]
  public int ArtistId { get; set; }
  [DeleteBehavior(DeleteBehavior.Cascade)]
  public Artist? Artist { get; set; }

  public ICollection<Song> Songs { get; set; } = new List<Song>();

  public DateTime CreatedDate { get; set; }
  public DateTime LastModifiedDate { get; set; }
}

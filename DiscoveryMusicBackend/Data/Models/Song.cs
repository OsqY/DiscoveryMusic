
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiscoveryMusic.Data.Models;

public class Song
{

  [Key]
  [Required]
  public int Id { get; set; }

  public required string Name { get; set; }
  public DateTime ReleasedDate { get; set; }

  [ForeignKey(nameof(Artist))]
  public int ArtistId { get; set; }
  public Artist? Artist { get; set; }

  [ForeignKey(nameof(Album))]
  public int AlbumId { get; set; }
  public Album? Album { get; set; }

  public DateTime CreatedDate { get; set; }
  public DateTime LastModifiedDate { get; set; }
}

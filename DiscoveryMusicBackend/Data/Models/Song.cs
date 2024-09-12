
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DiscoveryMusic.Data.Models;

public class Song
{

  [Key]
  [Required]
  public int Id { get; set; }

  public required string Name { get; set; }
  public DateTime ReleasedDate { get; set; }

  [ForeignKey(nameof(Album))]
  public int AlbumId { get; set; }
  [DeleteBehavior(DeleteBehavior.Cascade)]
  public Album? Album { get; set; }

  public DateTime CreatedDate { get; set; }
  public DateTime LastModifiedDate { get; set; }
}

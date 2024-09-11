
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiscoveryMusic.Data.Models;

public class Comment
{

  [Key]
  [Required]
  public int Id { get; set; }

  public required string Content { get; set; }
  public required float Rating { get; set; }

  [ForeignKey(nameof(ApiUser))]
  public required string UserId { get; set; }
  public ApiUser? User { get; set; }

  [ForeignKey(nameof(Album))]
  public int AlbumId { get; set; }
  public Album? Album { get; set; }

  public DateTime CreatedDate { get; set; }
  public DateTime LastModifiedDate { get; set; }
}

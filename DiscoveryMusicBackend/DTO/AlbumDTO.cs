
namespace DiscoveryMusic.DTO;

public class AlbumDTO
{
  public required string Name { get; set; }
  public required DateTime ReleaseDate { get; set; }
  public required int ArtistId { get; set; }
  public required ICollection<SongDTO> Songs { get; set; }
}

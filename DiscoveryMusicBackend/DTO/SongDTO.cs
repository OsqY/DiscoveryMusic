
namespace DiscoveryMusic.DTO;

public class SongDTO
{
  public required string Name { get; set; }
  public required DateTime ReleaseDate { get; set; }
  public required int AlbumId { get; set; }
  public required int ArtistId { get; set; }
}

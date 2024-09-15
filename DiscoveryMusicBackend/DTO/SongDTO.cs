namespace DiscoveryMusic.DTO;

public class SongDTO
{
    public required string Name { get; set; }
    public required DateTime ReleaseDate { get; set; }
    public int AlbumId { get; set; }
}

namespace DiscoveryMusic.DTO;

public class AlbumDTO
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public DateTime ReleaseDate { get; set; }
    public int ArtistId { get; set; }
    public ICollection<SongDTO>? Songs { get; set; }
}

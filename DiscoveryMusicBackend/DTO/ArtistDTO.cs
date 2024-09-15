namespace DiscoveryMusic.DTO;

public class ArtistDTO
{
    public string Name { get; set; }
    public DateTime Debut { get; set; }
    public int ArtistId { get; set; }
    public IEnumerable<AlbumDTO> Albums {get;set;}
}

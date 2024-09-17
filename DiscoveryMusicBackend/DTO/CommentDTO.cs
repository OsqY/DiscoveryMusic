namespace DiscoveryMusic.DTO;

public class CommentDTO
{
    public int Id { get; set; }
    public string? Content { get; set; }
    public float Rating { get; set; }
    public int AlbumId { get; set; }
    public string? Username { get; set; }
    public string? UserId { get; set; }
}

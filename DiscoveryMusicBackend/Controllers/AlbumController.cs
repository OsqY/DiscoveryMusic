using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DiscoveryMusic.Data.Database;
using DiscoveryMusic.Data.Models;
using DiscoveryMusic.DTO;
using Microsoft.AspNetCore.Authorization;

namespace DiscoveryMusic.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class AlbumController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public AlbumController(ApplicationDbContext context)
  {
    _context = context;
  }

  [HttpGet]
  public async Task<ActionResult<ApiResultDTO<Album>>> GetAlbums([FromQuery] PaginationDTO pagination)
  {
    return await ApiResultDTO<Album>.CreateAsync(_context.Albums.AsNoTracking(), pagination);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Album>> GetAlbum(int id)
  {
    var album = await _context.Albums.FindAsync(id);

    return album != null ? album : NotFound();
  }

  [Authorize(Roles = "Administrator")]
  [HttpPost]
  public async Task<ActionResult<Album>> Post(AlbumDTO model)
  {
    if (!ModelState.IsValid)
      return BadRequest();

    ICollection<SongDTO> songsInModel = model.Songs;
    ICollection<Song> songs = new List<Song>();



    var album = new Album
    {
      Name = model.Name,
      ReleaseDate = model.ReleaseDate,
      ArtistId = model.ArtistId,
      CreatedDate = DateTime.Now,
      LastModifiedDate = DateTime.Now
    };

    await _context.AddAsync(album);

    Console.WriteLine(album.Id);
    foreach (SongDTO song in songsInModel)
    {
      Song actualSong = new Song
      {
        Name = song.Name,
        ReleasedDate = song.ReleaseDate,
        AlbumId = album.Id,
        CreatedDate = DateTime.Now,
        LastModifiedDate = DateTime.Now
      };
      songs.Add(actualSong);
      await _context.AddAsync(actualSong);
    }

    album.Songs = songs;
    await _context.SaveChangesAsync();

    return StatusCode(201, album);
  }

  [Authorize(Roles = "Administrator")]
  [HttpPut("{id}")]
  public async Task<ActionResult> UpdateAlbum(int id, [FromBody] AlbumDTO model)
  {

    if (!ModelState.IsValid)
      return BadRequest();

    var album = await _context.Albums.FindAsync(id);

    if (album == null)
      return NotFound();

    album.Name = model.Name;
    album.ArtistId = model.ArtistId;
    album.ReleaseDate = model.ReleaseDate;
    album.LastModifiedDate = DateTime.Now;

    await _context.SaveChangesAsync();

    return Ok($"Album with id: {id} was updated.");

  }

  [Authorize(Roles = "Administrator")]
  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteAlbum(int id)
  {
    var album = await _context.Albums.FindAsync(id);

    if (album == null)
      return NotFound();

    _context.Remove(album);
    await _context.SaveChangesAsync();

    return Ok($"Album with id: {id} removed");
  }
}

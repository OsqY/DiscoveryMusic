
using DiscoveryMusic.Data.Database;
using DiscoveryMusic.Data.Models;
using DiscoveryMusic.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DiscoveryMusic.Controllers;


[ApiController]
[Route("api/[controller]/[action]")]
public class SongController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public SongController(ApplicationDbContext context)
  {
    _context = context;
  }

  [HttpGet]
  public async Task<ActionResult<ApiResultDTO<Song>>> GetSongs([FromQuery] PaginationDTO pagination)
  {
    return await ApiResultDTO<Song>.CreateAsync(_context.Songs.AsNoTracking(), pagination);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Song>> GetSong(int id)
  {
    var song = await _context.Songs.FindAsync(id);

    return song != null ? song : NotFound();
  }

  [Authorize(Roles = "Administrator")]
  [HttpPost]
  public async Task<ActionResult<Song>> Post(SongDTO model)
  {
    if (!ModelState.IsValid)
      return BadRequest();


    var song = new Song
    {
      Name = model.Name,
      AlbumId = model.AlbumId,
      CreatedDate = DateTime.Now,
      LastModifiedDate = DateTime.Now
    };

    await _context.AddAsync(song);
    await _context.SaveChangesAsync();

    return StatusCode(201, song);
  }

  [Authorize(Roles = "Administrator")]
  [HttpPut("{id}")]
  public async Task<ActionResult> UpdateSong(int id, [FromBody] SongDTO model)
  {

    if (!ModelState.IsValid)
      return BadRequest();

    var song = await _context.Songs.FindAsync(id);

    if (song == null)
      return NotFound();

    song.Name = model.Name;
    song.LastModifiedDate = DateTime.Now;
    song.AlbumId = model.AlbumId;

    await _context.SaveChangesAsync();

    return Ok($"Song with id: {id} was updated.");

  }

  [Authorize(Roles = "Administrator")]
  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteSong(int id)
  {
    var song = await _context.Songs.FindAsync(id);

    if (song == null)
      return NotFound();

    _context.Remove(song);
    await _context.SaveChangesAsync();

    return Ok($"Song with id: {id} removed");
  }
}

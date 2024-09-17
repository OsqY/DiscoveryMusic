using DiscoveryMusic.Data.Database;
using DiscoveryMusic.Data.Models;
using DiscoveryMusic.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DiscoveryMusic.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class ArtistController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ArtistController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResultDTO<Artist>>> GetArtists(
        [FromQuery] PaginationDTO paginationDTO
    )
    {
        return await ApiResultDTO<Artist>.CreateAsync(
            _context.Artists.AsNoTracking(),
            paginationDTO
        );
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Artist>> GetArtist(int id)
    {
        var artist = await _context
            .Artists.Where(a => a.Id == id)
            .Select(a => new ArtistDTO
            {
                ArtistId = a.Id,
                Name = a.Name,
                Albums = a.Albums.Select(a => new AlbumDTO
                {
                    Name = a.Name,
                    Id = a.Id,
                    ReleaseDate = a.ReleaseDate,
                }),
            })
            .FirstOrDefaultAsync();

        return artist != null ? Ok(artist) : NotFound();
    }

    [Authorize(Roles = "Administrator")]
    [HttpPost]
    public async Task<ActionResult<Artist>> CreateArtist(ArtistDTO model)
    {
        if (!ModelState.IsValid)
            return BadRequest();

        Artist artist = new Artist { Name = model.Name, Debut = model.Debut };

        await _context.AddAsync(artist);
        await _context.SaveChangesAsync();

        return StatusCode(
            201,
            $"Created artist with the name of: {model.Name} and date of debut: {model.Debut}."
        );
    }

    [Authorize(Roles = "Administrator")]
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateArtist(int id, [FromBody] ArtistDTO model)
    {
        var artist = await _context.Artists.FindAsync(id);

        if (artist == null)
            return NotFound();

        artist.Debut = model.Debut;
        artist.Name = model.Name;

        await _context.SaveChangesAsync();

        return Ok($"Artist with id: {id} was updated.");
    }

    [Authorize(Roles = "Administrator")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteArtist(int id)
    {
        var artist = await _context.Artists.FindAsync(id);

        if (artist == null)
            return NotFound();

        _context.Remove(artist);
        await _context.SaveChangesAsync();

        return Ok($"Artist with id: {id} was deleted.");
    }
}

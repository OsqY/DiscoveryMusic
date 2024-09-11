
using DiscoveryMusic.Data.Database;
using DiscoveryMusic.Data.Models;
using DiscoveryMusic.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DiscoveryMusic.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class CommentController : ControllerBase
{

  private readonly ApplicationDbContext _context;

  public CommentController(ApplicationDbContext context)
  {
    _context = context;
  }

  [HttpGet("{albumId}")]
  public async Task<ActionResult> GetCommentsFromAlbum(int albumId)
  {
    var comments = await _context.Comments.Where(c => c.AlbumId == albumId).ToListAsync();

    if (comments == null)
      return NotFound();

    return Ok(comments);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Comment>> GetComment(int id)
  {
    var comment = await _context.Comments.FindAsync(id);

    if (comment == null)
      return NotFound();

    return comment;
  }

}

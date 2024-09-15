using DiscoveryMusic.Data.Database;
using DiscoveryMusic.Data.Models;
using DiscoveryMusic.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DiscoveryMusic.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class CommentController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApiUser> _userManager;

    public CommentController(ApplicationDbContext context, UserManager<ApiUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResultDTO<Comment>>> GetComments(
        [FromQuery] PaginationDTO paginationDTO
    )
    {
        return await ApiResultDTO<Comment>.CreateAsync(
            _context.Comments.AsNoTracking(),
            paginationDTO
        );
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Comment>> GetComment(int id)
    {
        var comment = await _context.Comments.Where(c => c.Id ==id)
          .Select(c => new CommentDTO {
              Id = c.Id,
              AlbumId=c.AlbumId,Content=c.Content,
              Username= c.User.UserName,
              UserId=c.UserId
              }).FirstOrDefaultAsync();

        return comment != null ? Ok(comment) : NotFound();
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Comment>> CreateComment(CommentDTO model)
    {
        var user = await _userManager.GetUserAsync(User);

        if (user == null)
            return NotFound($"Unable to load user with ID {_userManager.GetUserId(User)}.");

        if (!ModelState.IsValid)
            return BadRequest();

        Comment comment = new Comment
        {
            Content = model.Content,
            Rating = model.Rating,
            AlbumId = model.AlbumId,
            UserId = user.Id,
        };

        await _context.AddAsync(comment);
        await _context.SaveChangesAsync();

        return StatusCode(
            201,
            $"Comment with content: {model.Content} and a rating of: {model.Rating} to the album {model.AlbumId}."
        );
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateComment(int id, [FromBody] CommentDTO model)
    {
        var comment = await _context.Comments.FindAsync(id);

        if (comment == null)
            return NotFound();

        var user = await _userManager.GetUserAsync(User);

        if (comment.UserId != user.Id)
            return Forbid($"Comment with ID: {id} does not belong to user {user.UserName}.");

        comment.Content = model.Content;

        await _context.SaveChangesAsync();

        return Ok($"Comment with id: {id} was updated.");
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteComment(int id)
    {
        var comment = await _context.Comments.FindAsync(id);

        if (comment == null)
            return NotFound();

        var user = await _userManager.GetUserAsync(User);

        if (comment.UserId != user.Id)
            return Forbid($"Comment with ID: {id} does not belong to user {user.UserName}.");

        _context.Remove(comment);
        await _context.SaveChangesAsync();

        return Ok($"Comment with id: {id} was deleted.");
    }
}

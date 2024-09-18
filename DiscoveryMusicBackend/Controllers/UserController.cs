
using DiscoveryMusic.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DiscoveryMusic.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class UserController : ControllerBase{

  private readonly UserManager<ApiUser> _userManager;

  public UserController(UserManager<ApiUser> userManager) {
    _userManager=userManager;
  }

  [Authorize]
    [HttpGet]
    public async Task<ActionResult> GetRole()
    {
      var user= await _userManager.GetUserAsync(User);
      var roles = await _userManager.GetRolesAsync(user);

      if(roles.Any(l => l == "Administrator")) {
        return Ok(new {Role="Admin"});
      }
      return Unauthorized(new {Role="User"});

    }

}

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]/[action]")]
public class UserController : ControllerBase
{
  private readonly IUserService userService;

  public UserController(IUserService userService)
  {
    this.userService = userService;
  }

  [HttpPost]
  [Authorize]
  public async Task<IActionResult> CheckIfUserIsSignedInForCourse([FromBody] CheckSignInDto data)
  {
    try
    {
      var isSignedIn = await userService.IsUserSignedUpForCourse(data.UserId, data.CourseId);
      return Ok(isSignedIn);
    }
    catch (Exception err)
    {
      throw err;
    }
  }
}

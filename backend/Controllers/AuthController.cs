using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
  private readonly IAuthService authService;

  public AuthController(IAuthService authService)
  {
    this.authService = authService;
  }

  [HttpPost("sign-up")]
  public async Task<IActionResult> Register([FromBody] SignUpDto model)
  {
    var result = await this.authService.SignUp(model.Email, model.Password);
    if (!result.Succeeded) return BadRequest(result.Errors);

    return Ok("User registered successfully!");
  }

  [HttpPost("sign-in")]
  public async Task<IActionResult> SignIn([FromBody] SignInDto model)
  {
    var success = await authService.SignIn(model.Email, model.Password);
    if (!success) return Unauthorized("Invalid credentials.");

    return Ok("Login successful!");
  }

  [HttpPost("logout")]
  public async Task<IActionResult> Logout()
  {
    await authService.Logout();
    return Ok("Logout successful!");
  }
}



using Microsoft.AspNetCore.Identity;

public class AuthService : IAuthService
{
  private readonly UserManager<User> userManager;
  private readonly SignInManager<User> signInManager;
  private readonly ILogger<AuthService> logger;

  public AuthService(UserManager<User> userManager, SignInManager<User> signInManager, ILogger<AuthService> logger)
  {
    this.userManager = userManager;
    this.signInManager = signInManager;
    this.logger = logger;
  }

  public async Task<IdentityResult> SignUp(string email, string password)
  {
    var user = new User { Id = Guid.NewGuid().ToString(), UserName = email, Email = email };

    var result = await userManager.CreateAsync(user, password);
    if (!result.Succeeded)
    {
      logger.LogError("User registration failed: {Errors}", string.Join(", ", result.Errors));
    }

    return result;
  }

  public async Task<bool> SignIn(string email, string password)
  {
    var user = await userManager.FindByEmailAsync(email);
    if (user == null) return false;

    var result = await signInManager.PasswordSignInAsync(user, password, false, false);
    return result.Succeeded;
  }

  public async Task Logout()
  {
    await signInManager.SignOutAsync();
  }
}


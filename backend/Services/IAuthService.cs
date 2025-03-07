using Microsoft.AspNetCore.Identity;

public interface IAuthService
{
  Task<IdentityResult> SignUp(string email, string password);
  Task<bool> SignIn(string email, string password);
  Task Logout();
}


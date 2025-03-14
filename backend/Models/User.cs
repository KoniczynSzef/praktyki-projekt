using Microsoft.AspNetCore.Identity;

public class User : IdentityUser
{
  public string FirstName { get; set; } = string.Empty;
  public string LastName { get; set; } = string.Empty;

  public List<UserCourse> UserCourses { get; set; } = new List<UserCourse>();
}


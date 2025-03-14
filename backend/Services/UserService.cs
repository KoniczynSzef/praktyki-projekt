using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

public class UserService : IUserService
{
  private readonly DatabaseContext db;
  private readonly UserManager<User> userManager;
  public UserService(DatabaseContext _db, UserManager<User> _userManager)
  {
    db = _db;
    userManager = _userManager;
  }

  public async Task<User> GetUserById(string id)
  {
    var user = await db.Users.FirstOrDefaultAsync(u => u.Id == id);

    if (user == null)
    {
      throw new Exception("User not found");
    }

    return user;
  }

  public async Task<bool> IsUserSignedUpForCourse(string userId, string courseId)
  {
    var userCourse = await db.UserCourses.Where(uc => uc.UserId == userId && uc.CourseId == courseId).ToListAsync();

    return userCourse.Count == 1;
  }

  public async Task<bool> IsUserAdmin(string userId)
  {
    var user = await userManager.FindByIdAsync(userId);
    if (user == null) return false;

    return await userManager.IsInRoleAsync(user, "Admin");
  }
}

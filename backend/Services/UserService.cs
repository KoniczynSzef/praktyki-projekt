using Microsoft.EntityFrameworkCore;

public class UserService : IUserService
{
  private readonly DatabaseContext db;
  public UserService(DatabaseContext _db)
  {
    db = _db;
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
}

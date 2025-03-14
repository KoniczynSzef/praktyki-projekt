public interface IUserService
{
  Task<User> GetUserById(string id);
  Task<bool> IsUserSignedUpForCourse(string userId, string courseId);
  Task<bool> IsUserAdmin(string userId);
}

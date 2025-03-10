public interface IUserService
{
  Task<User> GetUserById(string id);
}

public interface IUserService
{
  Task<User> GetUserById(int id);
}

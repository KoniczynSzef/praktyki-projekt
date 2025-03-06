using Microsoft.EntityFrameworkCore;

public class UserService : IUserService
{
  private readonly DatabaseContext db;
  public UserService(DatabaseContext _db)
  {
    db = _db;
  }

  public async Task<User> GetUserById(int id)
  {
    var user = await db.Users.FirstOrDefaultAsync(u => u.Id == id);

    if (user == null)
    {
      throw new Exception("User not found");
    }

    return user;
  }
}

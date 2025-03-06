public class User
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string LastName { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public string PhoneNumber { get; set; } = string.Empty;
  public string HashedPassword { get; set; } = string.Empty;

  public List<string> CourseIds { get; set; } = new List<string>();
  public List<Course> Courses { get; set; } = new List<Course>();
}


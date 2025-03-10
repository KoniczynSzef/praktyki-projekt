public class UserCourse
{
  public string UserId { get; set; }
  public User User { get; set; } = null!;

  public string CourseId { get; set; }
  public Course Course { get; set; } = null!;
}

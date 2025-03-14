public class Course
{
  public string Id { get; set; }
  public string Name { get; set; } = "";
  public string Description { get; set; } = "";

  public string Badge { get; set; } = "";

  public int Price { get; set; }
  public DateTime StartDate { get; set; }
  public int DurationInDays { get; set; }
  public string Instructor { get; set; } = "";

  public Level Level { get; set; }
  public int MaxMembers { get; set; }
  public int SignedMembers { get; set; }
  public List<string> SyllabusElements { get; set; } = new List<string>();
  public string ImageURL { get; set; } = "";

  public List<UserCourse> UserCourses { get; set; } = new List<UserCourse>();

  public Course() { }

  public Course(CreateCourseDto course)
  {
    this.Id = Guid.NewGuid().ToString();
    this.Name = course.Name;
    this.Description = course.Description;
    this.Badge = course.Badge;
    this.Price = course.Price;
    this.StartDate = course.StartDate;
    this.DurationInDays = course.DurationInDays;
    this.Instructor = course.Instructor;
    this.Level = course.Level;
    this.MaxMembers = course.MaxMembers;
    this.SignedMembers = course.SignedMembers;
    this.SyllabusElements = course.SyllabusElements;
    this.ImageURL = course.ImageURL;
  }
}


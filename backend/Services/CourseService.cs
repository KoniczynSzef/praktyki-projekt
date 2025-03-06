using Microsoft.EntityFrameworkCore;

public class CourseService : ICourseService
{
  private readonly DatabaseContext db;
  public CourseService(DatabaseContext _db)
  {
    db = _db;
  }

  public async Task<IEnumerable<Course>> GetAllCourses()
  {
    return await db.Courses.ToListAsync();
  }

  public async Task<Course> GetCourseById(int id)
  {
    var course = await db.Courses.FirstOrDefaultAsync(c => c.Id == id);

    if (course == null)
    {
      throw new Exception("Course not found");
    }

    return course;
  }

  public async Task<IEnumerable<Course>> GetSuggestedCoursesByCourseId(int id)
  {
    var course = await this.GetCourseById(id);
    var allCourses = await this.GetAllCourses();

    List<Course> suggestedCourses = new List<Course>();

    foreach (var c in allCourses)
    {
      if (suggestedCourses.Count == 3)
      {
        return suggestedCourses;
      }

      if (c.Badge == course.Badge || c.Instructor == course.Instructor)
      {
        suggestedCourses.Add(c);
      }
    }

    return suggestedCourses;
  }

  public async Task<IEnumerable<Course>> GetFeaturedCourses()
  {
    Random random = new Random();
    int max = await db.Courses.CountAsync();

    List<Course> selectedCourses = new List<Course>();
    var allCourses = await this.GetAllCourses();

    List<int> indices = new List<int>();

    while (indices.Count < 3)
    {
      int rand = random.Next(0, max);

      if (!indices.Contains(rand))
      {
        indices.Add(rand);
        selectedCourses.Add(allCourses.ElementAt(rand));
      }
    }

    return selectedCourses;
  }

  public async Task<Course> CreateCourse(CreateCourseDto courseDto)
  {
    Course newCourse = new Course(courseDto);

    await db.Courses.AddAsync(newCourse);
    await db.SaveChangesAsync();

    return newCourse;
  }

  public async Task<bool> SignUpForCourse(int id, int userId)
  {
    // var course = await this.GetCourseById(id);
    //
    // var user = await db.Users.FirstOrDefaultAsync(u => u.Id == userId);
    //
    // // TODO change in the future
    // if (user == null) return false;
    //
    // user.CourseIds.Add(id)
    //
    //
    return false;
  }

  public async Task<Course> UpdateCourse(int id, UpdateCourseDto courseDto)
  {
    var existingCourse = await db.Courses.FirstOrDefaultAsync(c => c.Id == id);

    if (existingCourse == null)
    {
      throw new Exception("Course not found");
    }

    existingCourse.Name = courseDto.Name;
    existingCourse.Description = courseDto.Description;
    existingCourse.Badge = courseDto.Badge;
    existingCourse.Price = courseDto.Price;
    existingCourse.StartDate = courseDto.StartDate;
    existingCourse.DurationInDays = courseDto.DurationInDays;
    existingCourse.Instructor = courseDto.Instructor;
    existingCourse.Level = courseDto.Level;
    existingCourse.MaxMembers = courseDto.MaxMembers;
    existingCourse.SignedMembers = courseDto.SignedMembers;
    existingCourse.SyllabusElements = courseDto.SyllabusElements;
    existingCourse.ImageURL = courseDto.ImageURL;

    await db.SaveChangesAsync();

    return existingCourse;
  }

  public async Task<bool> DeleteCourse(int id)
  {
    var course = await db.Courses.FindAsync(id);

    if (course == null)
    {
      throw new Exception("Did not find any course to delete.");
    }

    db.Courses.Remove(course);
    await db.SaveChangesAsync();

    return true;
  }
}



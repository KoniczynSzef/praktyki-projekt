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

  public Task<Course> GetCourseById(int id) => throw new NotImplementedException();

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

  public Task<IEnumerable<Course>> GetFeaturedCourses() => throw new NotImplementedException();

  public Task<Course> CreateCourse(Course course) => throw new NotImplementedException();
  public Task<bool> SignUpForCourse(int id) => throw new NotImplementedException();

  public Task<Course> UpdateCourse(int id, Course course) => throw new NotImplementedException();
  public Task<bool> DeleteCourse(int id) => throw new NotImplementedException();
}



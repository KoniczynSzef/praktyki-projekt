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

  public Task<Course> CreateCourse(Course course) => throw new NotImplementedException();
  public Task<bool> SignUpForCourse(int id) => throw new NotImplementedException();

  public Task<Course> UpdateCourse(int id, Course course) => throw new NotImplementedException();
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



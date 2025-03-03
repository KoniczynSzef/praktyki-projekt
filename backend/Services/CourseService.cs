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
        var course = db.Courses.FirstOrDefault(c => c.Id == id);

        if(course == null)
        {
            throw new Exceptions("Course not found");
        }
        return await course;
    }

  public Task<IEnumerable<Course>> GetSuggestedCoursesByCourseId(int id) => throw new NotImplementedException();
  public async Task<IEnumerable<Course>> GetFeaturedCourses()
    {
        Random random = new Random();
        int max = db.Courses.Count();
        int num1 = random.Next(1, max + 1);
        int num2 = random.Next(1, max + 1);
        int num3 = random.Next(1, max + 1);
        List<Course> selectedCourses = new List<Course>
        {
            this.GetCourseById(num1),
            this.GetCourseById(num2),
            this.GetCourseById(num3)
        };
        return await selectedCourses;
    }

  public Task<Course> CreateCourse(Course course) => throw new NotImplementedException();
  public Task<bool> SignUpForCourse(int id) => throw new NotImplementedException();

  public Task<Course> UpdateCourse(int id, Course course) => throw new NotImplementedException();
  public Task<bool> DeleteCourse(int id) => throw new NotImplementedException();
}



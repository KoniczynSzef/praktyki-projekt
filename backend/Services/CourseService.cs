public class CourseService : ICourseService
{
  public Task<IEnumerable<Course>> GetAllCourses() => throw new NotImplementedException();
  public Task<Course?> GetCourseById(int id) => throw new NotImplementedException();

  public Task<IEnumerable<Course>> GetSuggestedCoursesByCourseId(int id) => throw new NotImplementedException();
  public Task<IEnumerable<Course>> GetFeaturedCourses() => throw new NotImplementedException();

  public Task<Course> CreateCourse(Course course) => throw new NotImplementedException();
  public Task<bool> SignUpForCourse(int id) => throw new NotImplementedException();

  public Task<Course> UpdateCourse(int id, Course course) => throw new NotImplementedException();
  public Task<bool> DeleteCourse(int id) => throw new NotImplementedException();
}


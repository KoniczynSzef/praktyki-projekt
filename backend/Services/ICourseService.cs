public interface ICourseService
{
  Task<IEnumerable<Course>> GetAllCourses();
  Task<Course> GetCourseById(int id);

  Task<IEnumerable<Course>> GetSuggestedCoursesByCourseId(int id);
  Task<IEnumerable<Course>> GetFeaturedCourses();

  Task<Course> CreateCourse(CreateCourseDto courseDto);
  Task<bool> SignUpForCourse(int id, int userId);

  Task<Course> UpdateCourse(int id, UpdateCourseDto courseDto);

  Task<bool> DeleteCourse(int id);
}


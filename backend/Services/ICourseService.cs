public interface ICourseService
{
  Task<IEnumerable<Course>> GetAllCourses();
  Task<Course> GetCourseById(string id);

  Task<IEnumerable<Course>> GetSuggestedCoursesByCourseId(string id);
  Task<IEnumerable<Course>> GetFeaturedCourses();

  Task<Course> CreateCourse(CreateCourseDto courseDto);
  Task<bool> SignUpForCourse(string id, string userId);

  Task<Course> UpdateCourse(string id, UpdateCourseDto courseDto);

  Task<bool> DeleteCourse(string id);
}


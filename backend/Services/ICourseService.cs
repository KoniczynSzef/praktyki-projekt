public interface ICourseService
{
  Task<IEnumerable<Course>> GetAllCourses();
  Task<Course> GetCourseById(int id);

  Task<IEnumerable<Course>> GetSuggestedCoursesByCourseId(int id);
  Task<IEnumerable<Course>> GetFeaturedCourses();

  Task<Course> CreateCourse(Course course);
  Task<bool> SignUpForCourse(int id);


  Task<Course> UpdateCourse(int id, Course course);

  Task<bool> DeleteCourse(int id);
}


using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]/[action]")]
public class CourseController : ControllerBase
{
  private readonly ICourseService courseService;

  public CourseController(ICourseService courseService)
  {
    this.courseService = courseService;
  }

  [HttpGet]
  [Authorize]
  public async Task<IActionResult> GetAllCourses()
  {
    try
    {
      var courses = await courseService.GetAllCourses();
      return Ok(courses);
    }
    catch (Exception)
    {
      return BadRequest();
    }
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetCourseById(string id)
  {
    try
    {
      var course = await courseService.GetCourseById(id);
      return Ok(course);
    }
    catch (Exception err)
    {
      return NotFound(err.Message);
    }
  }

  [HttpGet("{id}/suggested")]
  public async Task<IActionResult> GetSuggestedCoursesByCourseId(string id)
  {
    try
    {
      var courses = await courseService.GetSuggestedCoursesByCourseId(id);
      return Ok(courses);
    }
    catch (Exception err)
    {
      return NotFound(err.Message);
    }
  }

  [HttpGet("featured")]
  public async Task<IActionResult> GetFeaturedCourses()
  {
    try
    {
      var courses = await courseService.GetFeaturedCourses();
      return Ok(courses);
    }
    catch (Exception err)
    {
      return NotFound(err.Message);
    }
  }

  [HttpPost]
  public async Task<IActionResult> CreateCourse(CreateCourseDto courseDto)
  {
    try
    {
      var createdCourse = await courseService.CreateCourse(courseDto);
      return CreatedAtAction(nameof(GetCourseById), new { Id = createdCourse.Id }, courseDto);
    }
    catch (Exception err)
    {
      return BadRequest(new { error = err.Message });
    }
  }

  [HttpPost("{id}/signup")]
  public async Task<IActionResult> SignUpForCourse(string id, [FromBody] string userId)
  {
    try
    {
      var signedUpSuccessfully = await courseService.SignUpForCourse(id, userId);
      return Ok("Signed up for course successfully");
    }
    catch (Exception err)
    {
      return BadRequest(new { error = err.Message });
    }
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateCourse(string id, UpdateCourseDto courseDto)
  {
    try
    {
      var updatedCourse = await courseService.UpdateCourse(id, courseDto);
      return NoContent();
    }
    catch (Exception)
    {
      return NotFound("Did not find any course to update.");
    }
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteCourse(string id)
  {
    try
    {
      var isSuccess = await courseService.DeleteCourse(id);
      return NoContent();
    }
    catch (Exception)
    {
      return NotFound("Did not find any course to delete.");
    }
  }
}


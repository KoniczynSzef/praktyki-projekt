public class Course
{
  public int Id { get; set; }
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
}


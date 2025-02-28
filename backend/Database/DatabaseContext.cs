using Microsoft.EntityFrameworkCore;

public class DatabaseContext: DbContext
{
    public DatabaseContext() {}
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) {}

    // public DbSet<Course> Courses { get; set; }  
}


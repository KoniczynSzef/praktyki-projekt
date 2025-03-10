using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

public class DatabaseContext : IdentityDbContext<User>
{
  public DbSet<Course> Courses { get; set; }
  public DbSet<UserCourse> UserCourses { get; set; }

  public DatabaseContext() { }
  public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {

    base.OnModelCreating(modelBuilder);
    modelBuilder.HasDefaultSchema("identity");

    modelBuilder.Entity<UserCourse>()
        .HasKey(uc => new { uc.UserId, uc.CourseId });

    modelBuilder.Entity<UserCourse>()
        .HasOne(uc => uc.User)
        .WithMany(u => u.UserCourses)
        .HasForeignKey(uc => uc.UserId);

    modelBuilder.Entity<UserCourse>()
        .HasOne(uc => uc.Course)
        .WithMany(c => c.UserCourses)
        .HasForeignKey(uc => uc.CourseId);
  }
}


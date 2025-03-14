using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

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

    // Explicitly configure IdentityUserRole to prevent UserId1 issue
    modelBuilder.Entity<IdentityUserRole<string>>()
        .HasKey(ur => new { ur.UserId, ur.RoleId });

    modelBuilder.Entity<IdentityUserRole<string>>()
        .HasOne<User>()
        .WithMany()
        .HasForeignKey(ur => ur.UserId)
        .IsRequired()
        .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<IdentityUserRole<string>>()
        .HasOne<IdentityRole>()
        .WithMany()
        .HasForeignKey(ur => ur.RoleId)
        .IsRequired()
        .OnDelete(DeleteBehavior.Cascade);

    // UserCourse Many-to-Many Relationship
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


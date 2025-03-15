using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();


builder.Services.AddCors(options =>
            {
              options.AddPolicy("AllowFrontend",
                  policy =>
                  {
                    policy.WithOrigins("http://localhost:3000")
                             .AllowAnyHeader()
                             .AllowAnyMethod()
                             .AllowCredentials();

                  });
            });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt =>
{
  opt.SwaggerDoc("v1", new OpenApiInfo { Title = "MyAPI", Version = "v1" });
  opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
  {
    In = ParameterLocation.Header,
    Description = "Please enter token",
    Name = "Authorization",
    Type = SecuritySchemeType.Http,
    BearerFormat = "JWT",
    Scheme = "bearer"
  });

  opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

builder.Services.AddDbContext<DatabaseContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentityApiEndpoints<User>().AddRoles<IdentityRole>().AddEntityFrameworkStores<DatabaseContext>().AddDefaultTokenProviders();

builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddAuthorization(options =>
{
  options.AddPolicy("AdminOnly", policy =>
  {
    policy.RequireRole("Admin");
  });
  options.AddPolicy("AdminOrUser", policy =>
  {
    policy.RequireRole("Admin", "User");
  });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
  var services = scope.ServiceProvider;


  var context = services.GetRequiredService<DatabaseContext>();
  if (context.Database.GetPendingMigrations().Any())
  {
    context.Database.Migrate();
  }
  var serviceProvider = scope.ServiceProvider;
  var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

  await SeedDataAsync(context);
  await SeedRolesAsync(roleManager);
}

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.MapGroup("/identity").MapCustomIdentityApi<User>();

app.MapControllers();

app.Run();

async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
{
  string[] roles = { "Admin", "User" };

  foreach (var role in roles)
  {
    if (!await roleManager.RoleExistsAsync(role))
    {
      await roleManager.CreateAsync(new IdentityRole(role));
    }
  }
}

async Task SeedDataAsync(DatabaseContext context)
{
  if (!context.Courses.Any()) // Prevent duplicate seeding
  {
    var courses = new List<Course>
        {
            new Course
            {
                Id = "1",
                Name = "Full-Stack Web Development",
                Description = "Learn to build modern web applications using React and Node.js.",
                Badge = "??",
                Price = 499,
                StartDate = DateTime.Parse("2025-04-01"),
                DurationInDays = 90,
                Instructor = "Alice Johnson",
                Level = Level.Intermediate,
                MaxMembers = 30,
                SignedMembers = 1,
                SyllabusElements = new List<string>
                {
                    "HTML, CSS, and JavaScript Basics",
                    "Frontend Development with React",
                    "Backend with Node.js and Express",
                    "Database Management with MongoDB",
                    "Deploying Full-Stack Applications"
                },
                ImageURL = "https://unsplash.com/photos/setting-sun-over-a-silhouette-tree-and-landscape-bmCMuip50Qw"
            },
            new Course
            {
                Id = "2",
                Name = "Machine Learning Fundamentals",
                Description = "An introduction to machine learning concepts and algorithms.",
                Badge = "??",
                Price = 599,
                StartDate = DateTime.Parse("2025-04-15"),
                DurationInDays = 60,
                Instructor = "Dr. John Smith",
                Level = Level.Advanced,
                MaxMembers = 25,
                SignedMembers = 1,
                SyllabusElements = new List<string>
                {
                    "Introduction to Machine Learning",
                    "Supervised and Unsupervised Learning",
                    "Neural Networks and Deep Learning",
                    "Natural Language Processing",
                    "Model Deployment and Optimization"
                },
                ImageURL = "https://source.unsplash.com/800x600/?ai,machine-learning"
            },
            new Course
            {
                Id = "3",
                Name = "Cybersecurity Essentials",
                Description = "Master the basics of cybersecurity and ethical hacking.",
                Badge = "???",
                Price = 399,
                StartDate = DateTime.Parse("2025-05-01"),
                DurationInDays = 45,
                Instructor = "Ethan Williams",
                Level = Level.Intermediate,
                MaxMembers = 20,
                SignedMembers = 1,
                SyllabusElements = new List<string>
                {
                    "Cyber Threats and Defense Strategies",
                    "Ethical Hacking Basics",
                    "Network Security",
                    "Cryptography Essentials",
                    "Incident Response and Forensics"
                },
                ImageURL = "https://source.unsplash.com/800x600/?cybersecurity,hacking"
            },
            new Course
            {
                Id = "4",
                Name = "Data Science with Python",
                Description = "Explore data analysis, visualization, and machine learning with Python.",
                Badge = "??",
                Price = 549,
                StartDate = DateTime.Parse("2025-06-01"),
                DurationInDays = 75,
                Instructor = "Sophia Martinez",
                Level = Level.Advanced,
                MaxMembers = 35,
                SignedMembers = 0,
                SyllabusElements = new List<string>
                {
                    "Python for Data Science",
                    "Data Visualization Techniques",
                    "Machine Learning with Scikit-Learn",
                    "Big Data Processing",
                    "Deep Learning Fundamentals"
                },
                ImageURL = "https://source.unsplash.com/800x600/?data-science,python"
            },
            new Course
            {
                Id = "5",
                Name = "Game Development with Unity",
                Description = "Create amazing 2D and 3D games using Unity and C#.",
                Badge = "??",
                Price = 450,
                StartDate = DateTime.Parse("2025-07-01"),
                DurationInDays = 90,
                Instructor = "Michael Brown",
                Level = Level.Intermediate,
                MaxMembers = 40,
                SignedMembers = 0,
                SyllabusElements = new List<string>
                {
                    "Introduction to Game Development",
                    "Unity Basics and C# Scripting",
                    "Physics and Animations in Unity",
                    "Multiplayer Game Development",
                    "Publishing Your Game"
                },
                ImageURL = "https://source.unsplash.com/800x600/?game,unity"
            }
        };

    context.Courses.AddRange(courses);
    await context.SaveChangesAsync();
  }
}


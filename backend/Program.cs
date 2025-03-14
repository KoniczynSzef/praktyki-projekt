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
  var serviceProvider = scope.ServiceProvider;
  var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
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

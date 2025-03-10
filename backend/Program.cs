using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();
builder.Services.AddAuthentication().AddCookie(IdentityConstants.ApplicationScheme);

builder.Services.AddIdentityCore<User>().AddEntityFrameworkStores<DatabaseContext>().AddApiEndpoints();

// Database Context
builder.Services.AddDbContext<DatabaseContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.MapOpenApi();

  // Using swaggger
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.Use((ctx, next) =>
{
  ctx.Response.Headers["Access-Control-Allow-Origin"] = "http://localhost:3000";
  return next();
});

app.UseHttpsRedirection();

app.MapIdentityApi<User>();

app.MapControllers();

app.Run();

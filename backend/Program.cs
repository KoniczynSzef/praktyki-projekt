using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddCors(options =>
            {
              options.AddPolicy("AllowAllOrigin",
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

builder.Services.AddIdentityApiEndpoints<User>().AddEntityFrameworkStores<DatabaseContext>();
builder.Services.AddAuthorization();

builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigin");

app.UseHttpsRedirection();

app.MapGroup("/identity").MapCustomIdentityApi<User>();

app.MapControllers();

app.Run();

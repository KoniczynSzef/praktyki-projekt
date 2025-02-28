using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Swagger docs
builder.Services.AddSwaggerGen();

// Database Context
builder.Services.AddDbContext<DatabaseContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

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

app.UseAuthorization();

app.MapControllers();

app.Run();

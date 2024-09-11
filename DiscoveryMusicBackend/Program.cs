using DiscoveryMusic.Data.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using DiscoveryMusic.Data.Models;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddAuthorization();
builder.Services.AddControllers();

builder.Services.AddAuthentication()
  .AddCookie(IdentityConstants.ApplicationScheme)
  .AddBearerToken(IdentityConstants.BearerScheme);

builder.Services.AddIdentityCore<ApiUser>().AddEntityFrameworkStores<ApplicationDbContext>().AddApiEndpoints();

builder.Services.AddDbContext<ApplicationDbContext>(opts =>
{
  opts.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapIdentityApi<ApiUser>();

app.MapControllers();


app.Run();


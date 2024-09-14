using DiscoveryMusic.Data.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using DiscoveryMusic.Data.Models;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(opts =>
{
  opts.UseSqlServer(connectionString);
});

builder.Services.AddControllers()
  .AddJsonOptions(opts => opts.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);

builder.Services.AddCors(opts =>
{
  opts.AddDefaultPolicy(cfg =>
  {
    cfg.AllowAnyHeader();
    cfg.AllowAnyOrigin();
    cfg.AllowAnyMethod();
  });
});

builder.Services.AddAuthentication(opts =>
{
  opts.DefaultAuthenticateScheme = IdentityConstants.ApplicationScheme;
})
  .AddCookie(IdentityConstants.ApplicationScheme);

builder.Services.AddAuthorization();

builder.Services.AddIdentityCore<ApiUser>
(opts => opts.SignIn.RequireConfirmedAccount = true).AddRoles<IdentityRole>()
  .AddEntityFrameworkStores<ApplicationDbContext>().AddApiEndpoints();

builder.Services.Configure<IdentityOptions>(options =>
{
  options.Password.RequireDigit = true;
  options.Password.RequireLowercase = true;
  options.Password.RequireNonAlphanumeric = true;
  options.Password.RequireUppercase = true;
  options.Password.RequiredLength = 10;
  options.Password.RequiredUniqueChars = 1;

  options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
  options.Lockout.MaxFailedAccessAttempts = 5;
  options.Lockout.AllowedForNewUsers = true;

  options.User.AllowedUserNameCharacters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
  options.User.RequireUniqueEmail = false;
});

builder.Services.ConfigureApplicationCookie(options =>
{
  options.Cookie.HttpOnly = true;
  options.ExpireTimeSpan = TimeSpan.FromMinutes(5);

  options.LoginPath = "/Identity/Account/Login";
  options.AccessDeniedPath = "/Identity/Account/AccessDenied";
  options.SlidingExpiration = true;
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
app.UseCors();
app.MapIdentityApi<ApiUser>();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();


app.Run();


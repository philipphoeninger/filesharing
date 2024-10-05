[assembly: ApiController]

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// add SQL Server Connection
var connectionString = builder.Configuration.GetConnectionString("FileSharing");
builder.Services.AddSqlServer<ApplicationDBContext>(connectionString, options =>
{
    options.EnableRetryOnFailure().CommandTimeout(60);
});

builder.Services.AddRepositories();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Initialize the database
    if (app.Configuration.GetValue<bool>("RebuildDatabase"))
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDBContext>();
    }
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

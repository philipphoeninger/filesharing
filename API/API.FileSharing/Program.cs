[assembly: ApiController]

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAndConfigureSwagger(
    builder.Configuration,
    Path.Combine(
        AppContext.BaseDirectory,
        $"{Assembly.GetExecutingAssembly().GetName().Name}.xml"),
    true);

// add API Version support
builder.Services.AddFileSharingApiVersionConfiguration(new ApiVersion(0, 1));

// add SQL Server Connection
var connectionString = builder.Configuration.GetConnectionString("FileSharing");
builder.Services.AddSqlServer<ApplicationDBContext>(connectionString, options =>
{
    options.EnableRetryOnFailure().CommandTimeout(60);
});

// add auth
builder.Services.AddAuthorization();
builder.Services.AddAuthentication();

// Add Identity
builder.Services
    .AddIdentityCore<User>()
    .AddEntityFrameworkStores<ApplicationDBContext>()
    .AddApiEndpoints();

// add repositories
builder.Services.AddRepositories();

// Configure logging
builder.ConfigureSerilog();
builder.Services.RegisterLoggingInterfaces();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Initialize the database
    if (app.Configuration.GetValue<bool>("RebuildDatabase"))
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDBContext>();
        SampleDataInitializer.InitializeData(dbContext);
        //SampleDataInitializer.ClearAndReseedDatabase(dbContext);
    }
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        using var scope = app.Services.CreateScope();
        var versionProvider = scope.ServiceProvider.GetRequiredService<IApiVersionDescriptionProvider>();
        // build a swagger endpoint for each discovered API version
        foreach (var description in versionProvider.ApiVersionDescriptions)
        {
            options.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", description.GroupName.ToUpperInvariant());
        }
    });
}

app.UseHttpsRedirection();

// enable authorization checks
app.UseAuthentication();
app.UseAuthorization();

app.MapIdentityApi<User>();
app.MapControllers();

app.Run();

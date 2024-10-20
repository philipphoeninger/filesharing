namespace API.FileSharing.Extensions;

public static class IdentityExtensions
{
    public static IServiceCollection AddIdentityHandlersAndStores(this IServiceCollection services)
    {
        services.AddIdentityCore<User>()
                .AddEntityFrameworkStores<ApplicationDBContext>()
                .AddApiEndpoints();
        return services;
    }

    public static IServiceCollection ConfigureIdentityOptions(this IServiceCollection services)
    {
        services.Configure<IdentityOptions>(options =>
        {
            options.User.RequireUniqueEmail = true;
        });
        return services;
    }

    // Auth = Authentication + Authorization
    public static IServiceCollection AddIdentityAuth(this IServiceCollection services, IConfiguration config)
    {
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme =
            options.DefaultChallengeScheme =
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }) // JwtBearerDefaults.AuthenticationScheme
        .AddJwtBearer(options =>
        {
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = config["JWTSettings:Issuer"],
                ValidAudience = config["JWTSettings:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWTSettings:Key"]!)),
                ClockSkew = TimeSpan.FromMinutes(2)
            };
        });
        services.AddAuthorization();
        return services;
    }

    public static WebApplication AddIdentityAuthMiddlewares(this WebApplication app)
    {
        app.UseAuthentication();
        app.UseAuthorization();
        return app;
    }
}

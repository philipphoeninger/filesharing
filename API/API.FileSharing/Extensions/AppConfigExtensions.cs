namespace API.FileSharing.Extensions;

public static class AppConfigExtensions
{
    public static WebApplication ConfigureCORS(this WebApplication app, IConfiguration config)
    {
        app.UseCors();
        return app;
    }

    public static IServiceCollection AddAppConfig(this IServiceCollection services, IConfiguration config)
    {
        services.Configure<JWTSettings>(config.GetSection("JWTSettings"));
        return services;
    }
}

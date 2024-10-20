namespace API.FileSharing.Extensions;

public static class EFCoreExtensions
{
    public static IServiceCollection AddSqlServerConnection(this IServiceCollection services, IConfiguration config)
    {
        string? connectionString = config.GetConnectionString("FileSharing");
        services.AddSqlServer<ApplicationDBContext>(connectionString, options =>
        {
            options.EnableRetryOnFailure().CommandTimeout(60);
        });
        return services;
    }
}

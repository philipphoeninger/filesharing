﻿namespace SERVICES.FileSharing.DataServices;

public static class DataServiceConfiguration
{
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IFileItemRepo, FileItemRepo>();
        
        return services;
    }
}

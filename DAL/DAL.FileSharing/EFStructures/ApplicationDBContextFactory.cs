using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace DAL.FileSharing.EFStructures;
public class ApplicationDBContextFactory : IDesignTimeDbContextFactory<ApplicationDBContext>
{
    public ApplicationDBContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDBContext>();
        var connectionString = @"";
        optionsBuilder.UseSqlServer(connectionString, options => options.EnableRetryOnFailure());
        Console.WriteLine(connectionString);
        return new ApplicationDBContext(optionsBuilder.Options);
    }
}

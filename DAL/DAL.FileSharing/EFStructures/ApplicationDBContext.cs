using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DAL.FileSharing.EFStructures;
public partial class ApplicationDBContext : DbContext
{
    #region ctors
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
        : base(options)
    {
    }
    #endregion

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    #region overrides
    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder.Properties<string>().HaveMaxLength(200);
        configurationBuilder.IgnoreAny<INonPersisted>();
    }
    #endregion
}

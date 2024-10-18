﻿namespace DAL.FileSharing.EFStructures;

public partial class ApplicationDBContext : IdentityDbContext<User>
{
    #region ctors
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
        : base(options)
    {
        SavingChanges += (sender, args) =>
        {
            string cs = ((ApplicationDBContext)sender).Database!.GetConnectionString();
            Console.WriteLine($"Saving changes for {cs}");
        };
        SavedChanges += (sender, args) =>
        {
            string cs = ((ApplicationDBContext)sender).Database!.GetConnectionString();
            Console.WriteLine($"Saved {args!.EntitiesSavedCount} changes for {cs}");
        };
        SaveChangesFailed += (sender, args) =>
        {
            Console.WriteLine($"An exception occurred! {args.Exception.Message} entities");
        };
        ChangeTracker.Tracked += ChangeTracker_Tracked;
        ChangeTracker.StateChanged += ChangeTracker_StateChanged;
    }
    #endregion

    #region fields
    public virtual DbSet<SeriLogEntry> SeriLogEntries { get; set; }
    public virtual DbSet<FileItem> FileItems { get; set; }
    public virtual DbSet<Link> Links { get; set; }
    #endregion

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // configure Identity Framework schema
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<User>().ToTable("Users", "identity");
        modelBuilder.Entity<IdentityRole>().ToTable("Roles", "identity");
        modelBuilder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims", "identity");
        modelBuilder.Entity<IdentityUserRole<string>>().ToTable("UserRoles", "identity");
        modelBuilder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins", "identity");
        modelBuilder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims", "identity");
        modelBuilder.Entity<IdentityUserToken<string>>().ToTable("UserTokens", "identity");

        new SeriLogEntryConfiguration().Configure(modelBuilder.Entity<SeriLogEntry>());
        new FileItemConfiguration().Configure(modelBuilder.Entity<FileItem>());
        new LinkConfiguration().Configure(modelBuilder.Entity<Link>());

        OnModelCreatingPartial(modelBuilder);
    }
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    #region mappedDbFunctions
    // TODO
    #endregion

    #region eventhandlers
    private void ChangeTracker_Tracked(object sender, EntityTrackedEventArgs e)
    {
        var source = (e.FromQuery) ? "Database" : "Code";
        if (e.Entry.Entity is FileItem f)
        {
            Console.WriteLine($"FileItem entry {f.Name} was added from {source}");
        }
        if (e.Entry.Entity is Link l)
        {
            Console.WriteLine($"Link entry {l.Name ?? l.Url} was added from {source}");
        }
    }

    private void ChangeTracker_StateChanged(object sender, EntityStateChangedEventArgs e)
    {
        if (e.Entry.Entity is FileItem f) Log_StateChanged(f.Name, e);
        if (e.Entry.Entity is Link l) Log_StateChanged(l.Name ?? l.Url, e);
    }

    private void Log_StateChanged(string name, EntityStateChangedEventArgs e)
    {
        var action = string.Empty;
        Console.WriteLine($"Link {name} was {e.OldState} before the state changed to {e.NewState}");
        switch (e.NewState)
        {
            case EntityState.Unchanged:
                action = e.OldState switch
                {
                    EntityState.Added => "Added",
                    EntityState.Modified => "Edited",
                    _ => action
                };
                Console.WriteLine($"The object was {action}");
                break;
        }
    }
    #endregion

    #region overrides
    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder.Properties<string>().HaveMaxLength(200);
        configurationBuilder.IgnoreAny<INonPersisted>();
    }

    public override int SaveChanges()
    {
        try
        {
            return base.SaveChanges();
        }
        catch (DbUpdateConcurrencyException ex)
        {
            //A concurrency error occurred
            //Should log and handle intelligently
            throw new CustomConcurrencyException("A concurrency error happened.", ex);
        }
        catch (RetryLimitExceededException ex)
        {
            //DbResiliency retry limit exceeded
            //Should log and handle intelligently
            throw new CustomRetryLimitExceededException("There is a problem with SQL Server.", ex);
        }
        catch (DbUpdateException ex)
        {
            //Should log and handle intelligently
            throw new CustomDbUpdateException("An error occurred updating the database", ex);
        }
        catch (Exception ex)
        {
            //Should log and handle intelligently
            throw new CustomException("An error occurred updating the database", ex);
        }
    }
    #endregion
}

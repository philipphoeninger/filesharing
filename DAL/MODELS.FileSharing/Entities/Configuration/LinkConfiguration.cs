namespace MODELS.FileSharing.Entities.Configuration;

public class LinkConfiguration : IEntityTypeConfiguration<Link>
{
    public void Configure(EntityTypeBuilder<Link> builder)
    {
        // query filters
        builder.HasQueryFilter(l => !l.FileItemNavigation.IsDeleted);

        // properties
        builder.Property(l => l.CreatedAt).HasDefaultValueSql("GetDate()");
        builder.Property(l => l.Display)
            .HasComputedColumnSql("[Name]", stored: true);

        // relationships
        builder.HasOne(l => l.FileItemNavigation)
            .WithMany(f => f.Links)
            .HasForeignKey(l => l.FileItemId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_Links_FileItem");

        builder.HasOne(l => l.OwnerNavigation)
           .WithMany(u => u.Links)
           .HasForeignKey(l => l.Owner)
           .IsRequired()
           .OnDelete(DeleteBehavior.Cascade)
           .HasConstraintName("FK_Links_User");

        builder.HasIndex(l => l.Url, "IX_Links_Url").IsUnique();

        // temporal
        builder.ToTable(b => b.IsTemporal(tb =>
        {
            tb.HasPeriodEnd("ValidTo");
            tb.HasPeriodStart("ValidFrom");
            tb.UseHistoryTable("LinksAudit");
        }));
    }
}

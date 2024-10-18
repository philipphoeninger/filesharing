namespace MODELS.FileSharing.Entities.Configuration;

public class LinkConfiguration : IEntityTypeConfiguration<Link>
{
    public void Configure(EntityTypeBuilder<Link> builder)
    {
        // query filters

        // properties
        builder.Property(l => l.CreatedAt).HasDefaultValueSql("GetDate()");
        builder.Property(l => l.Display)
            .HasComputedColumnSql("[Name]", stored: true);

        // relationships
        builder.HasOne(l => l.FileItemNavigation)
            .WithMany(f => f.Links)
            .HasForeignKey(l => l.FileItemId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_Links_FileItem");

        builder.HasOne(l => l.UserNavigation)
           .WithMany(u => u.Links)
           .HasForeignKey(l => l.UserId)
           .OnDelete(DeleteBehavior.Cascade)
           .HasConstraintName("FK_Links_User");

        builder.HasIndex(l => l.url, "IX_Links_Url").IsUnique();

        // temporal
        builder.ToTable(b => b.IsTemporal(tb =>
        {
            tb.HasPeriodEnd("ValidTo");
            tb.HasPeriodStart("ValidFrom");
            tb.UseHistoryTable("FileItemsAudit");
        }));
    }
}

namespace MODELS.FileSharing.Entities.Configuration;

public class FileItemConfiguration : IEntityTypeConfiguration<FileItem>
{
    public void Configure(EntityTypeBuilder<FileItem> builder)
    {
        // query filters
        builder.HasQueryFilter(f => !f.IsDeleted);

        // properties
        builder.Property(f => f.IsFolder)
            .HasField("_isFolder")
            .HasDefaultValue(false);
        builder.Property(f => f.CreatedAt).HasDefaultValueSql("GetDate()");
        builder.Property(f => f.Display)
            .HasComputedColumnSql("[Name]", stored: true); // TODO: add isFolder to display-string

        // relationships
        builder.HasOne(f => f.ParentNavigation)
            .WithMany(f => f.FileItems)
            .HasForeignKey(f => f.ParentId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.ClientNoAction)
            .HasConstraintName("FK_FileItems_Parents");
        // TODO: parentId item isFolder=true constraint

        builder.HasOne(f => f.OwnerNavigation)
           .WithMany(u => u.FileItems)
           .HasForeignKey(f => f.Owner)
           .IsRequired()
           .OnDelete(DeleteBehavior.Restrict)
           .HasConstraintName("FK_FileItems_User");

        // temporal
        builder.ToTable(b => b.IsTemporal(tb =>
        {
            tb.HasPeriodEnd("ValidTo");
            tb.HasPeriodStart("ValidFrom");
            tb.UseHistoryTable("FileItemsAudit");
        }));
    }
}

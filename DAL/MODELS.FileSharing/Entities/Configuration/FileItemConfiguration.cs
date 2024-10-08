﻿namespace MODELS.FileSharing.Entities.Configuration;

public class FileItemConfiguration : IEntityTypeConfiguration<FileItem>
{
    public void Configure(EntityTypeBuilder<FileItem> builder)
    {
        // query filters
        builder.HasQueryFilter(f => !f.IsDeleted);
        builder.HasQueryFilter(f => !f.ParentNavigation!.IsDeleted);

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
            .OnDelete(DeleteBehavior.ClientNoAction)
            .HasConstraintName("FK_FileItems_Parents");
        // TODO: parentId item isFolder=true constraint

        //builder.HasIndex(f => new { f.Name, f.ParentId }, "IX_FileItems_Folder").IsUnique();

        // temporal
        builder.ToTable(b => b.IsTemporal(tb =>
        {
            tb.HasPeriodEnd("ValidTo");
            tb.HasPeriodStart("ValidFrom");
            tb.UseHistoryTable("FileItemsAudit");
        }));
    }
}

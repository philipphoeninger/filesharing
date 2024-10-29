namespace MODELS.FileSharing.Entities;

public class User : IdentityUser
{
    [InverseProperty(nameof(Link.OwnerNavigation))]
    public virtual IEnumerable<Link> Links { get; set; } = new List<Link>();

    [InverseProperty(nameof(FileItem.OwnerNavigation))]
    public virtual IEnumerable<FileItem> FileItems { get; set; } = new List<FileItem>();
}

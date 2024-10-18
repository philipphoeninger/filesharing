namespace MODELS.FileSharing.Entities;

public class User : IdentityUser
{
    [InverseProperty(nameof(Link.UserNavigation))]
    public virtual IEnumerable<Link> Links { get; set; } = new List<Link>();
}

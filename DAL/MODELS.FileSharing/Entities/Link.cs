namespace MODELS.FileSharing.Entities;

[Table("Links", Schema = "dbo")]
[EntityTypeConfiguration(typeof(LinkConfiguration))]
public partial class Link : BaseEntity
{
    #region fields
    [Required]
    public string Url { get; set; }

    [Required]
    [DisplayName("File Item")]
    public int FileItemId { get; set; }

    [ForeignKey(nameof(FileItemId))]
    [InverseProperty(nameof(FileItem.Links))]
    public virtual FileItem FileItemNavigation { get; set; }

    [Required]
    public DateTime CreatedAt { get; set; }

    [Required]
    public DateTime ValidUntil { get; set; }

    [Required]
    public DateTime LastChanged { get; set; }

    [Required]
    public string Owner { get; set; }

    [ForeignKey(nameof(Owner))]
    [InverseProperty(nameof(User.Links))]
    public virtual User OwnerNavigation { get; set; }

    public bool IsActive { get; set; }

    [StringLength(200)]
    public string? Name { get; set; }

    public string? Description { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public string? Display { get; set; }
    #endregion

    #region ctors
    public Link() { }

    public Link(string pUrl, FileItem pFileItem, User pUser)
    {
        Url = pUrl;
        FileItemId = pFileItem.Id;
        FileItemNavigation = pFileItem;
        Owner = pUser.Id;
        OwnerNavigation = pUser;
    }
    #endregion

    #region methods
    public override string ToString()
    {
        return $"{Name} is a Link from {OwnerNavigation.UserName} with ID {Id}";
    }
    #endregion
}

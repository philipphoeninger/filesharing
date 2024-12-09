namespace MODELS.FileSharing.Entities;

[Table("FileItems", Schema = "dbo")]
[EntityTypeConfiguration(typeof(FileItemConfiguration))]
[Index(nameof(Name), nameof(ParentId), Name = "IX_Items_Path", IsUnique = true)]
public partial class FileItem : BaseEntity
{
    #region fields
    [Required]
    [StringLength(200)]
    public string Name { get; set; }

    [Required]
    public DateTime CreatedAt { get; set; }

    [Required]
    public bool IsDeleted { get; set; }

    [DisplayName("Parent")]
    public int? ParentId { get; set; }

    [ForeignKey(nameof(ParentId))]
    [InverseProperty(nameof(FileItems))]
    public virtual FileItem? ParentNavigation { get; set; }

    [InverseProperty(nameof(ParentNavigation))]
    public virtual IEnumerable<FileItem> FileItems { get; set; } = new List<FileItem>();

    [InverseProperty(nameof(Link.FileItemNavigation))]
    public virtual IEnumerable<Link> Links { get; set; } = new List<Link>();

    [Required]
    public string Owner { get; set; }

    [ForeignKey(nameof(Owner))]
    [InverseProperty(nameof(User.FileItems))]
    public virtual User OwnerNavigation { get; set; }

    private bool? _isFolder;
    [DisplayName("Is Folder")]
    public bool IsFolder
    {
        get => _isFolder ?? false;
        set => _isFolder = value;
    }

    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public string? Display { get; set; }
    #endregion

    #region ctors
    public FileItem()
    {
        // TODO: generate Name
    }

    public FileItem(string pName, User pUser, bool? pIsFolder = false)
    {
        Name = pName;
        if (pIsFolder != null) _isFolder = pIsFolder;
        CreatedAt = DateTime.Now;
    }
    #endregion

    #region methods
    public override string ToString()
    {
        return $"{Name} is a {(IsFolder ? "Folder" : "File")} with ID {Id}";
    }
    #endregion
}

namespace DAL.FileSharing.Repos;

public class FileItemRepo : TemporalTableBaseRepo<FileItem>, IFileItemRepo
{
    #region ctors
    public FileItemRepo(ApplicationDBContext context) : base(context) { }
    internal FileItemRepo(DbContextOptions<ApplicationDBContext> options) : base(options) { }
    #endregion

    #region methods
    public override FileItem? Find(int id)
    {
        var fileItem = Context.FileItems.Include(x => x.FileItems).First(x => x.Id == id);

        return fileItem;
    }
    #endregion
}

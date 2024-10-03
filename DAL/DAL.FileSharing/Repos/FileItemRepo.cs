namespace DAL.FileSharing.Repos;

public class FileItemRepo : TemporalTableBaseRepo<FileItem>, IFileItemRepo
{
    #region ctors
    public FileItemRepo(ApplicationDBContext context) : base(context) { }
    internal FileItemRepo(DbContextOptions<ApplicationDBContext> options) : base(options) { }
    #endregion

    #region methods
    // TODO
    #endregion
}

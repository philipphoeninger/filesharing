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
        FileItem? fileItem = Context.FileItems.Include(x => x.FileItems)
                                              .First(x => x.Id == id);

        int count = 0;
        if (fileItem != null) LoadParents(fileItem);

        return fileItem;

        // nested
        void LoadParents(FileItem _fileItem)
        {
            if (_fileItem.ParentId == null) return; // gate
            Context.Entry(_fileItem)
                .Reference(c => c.ParentNavigation)
                .Load();
            count += 1;
            if (count >= 3 || _fileItem.ParentNavigation?.ParentId == null) return;
            LoadParents(_fileItem.ParentNavigation);
        }
    }
    #endregion
}

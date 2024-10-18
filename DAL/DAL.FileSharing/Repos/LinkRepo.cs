namespace DAL.FileSharing.Repos;

public class LinkRepo : TemporalTableBaseRepo<Link>, ILinkRepo
{
    #region ctors
    public LinkRepo(ApplicationDBContext context) : base(context) { }
    internal LinkRepo(DbContextOptions<ApplicationDBContext> options) : base(options) { }
    #endregion

    #region methods
    // TODO
    #endregion
}

namespace DAL.FileSharing.Repos;

public class LinkRepo : TemporalTableBaseRepo<Link>, ILinkRepo
{
    #region ctors
    public LinkRepo(ApplicationDBContext context) : base(context) { }
    internal LinkRepo(DbContextOptions<ApplicationDBContext> options) : base(options) { }
    #endregion

    #region methods
    // TODO

    public override IEnumerable<Link> GetAll(string userId)
    {
        var links = Context.Links.Where(x => x.Owner == userId);
        return links;
    }
    #endregion
}

namespace API.FileSharing.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LinksController : BaseCrudController<Link, LinksController>
{
    public LinksController(IAppLogging<LinksController> logger, ILinkRepo repo) : base(logger, repo)
    {
    }

    // TODO: put more individual Requests here
}

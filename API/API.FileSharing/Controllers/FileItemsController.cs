namespace API.FileSharing.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FileItemsController : BaseCrudController<FileItem, FileItemsController>
{
    public FileItemsController(IAppLogging<FileItemsController> logger, IFileItemRepo repo) : base(logger, repo)
    {
    }

    // TODO: put more individual Requests here
}

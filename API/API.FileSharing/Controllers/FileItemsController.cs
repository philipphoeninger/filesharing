namespace API.FileSharing.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FileItemsController : BaseCrudController<FileItem, FileItemsController>
{
    public FileItemsController(IFileItemRepo repo) : base(repo) { }
}

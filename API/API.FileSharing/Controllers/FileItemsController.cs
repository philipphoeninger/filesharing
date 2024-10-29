namespace API.FileSharing.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FileItemsController : BaseCrudController<FileItem, FileItemsController>
{
    public FileItemsController(IAppLogging<FileItemsController> logger, IFileItemRepo repo) : base(logger, repo)
    {
    }

    /// <summary>
    /// Gets a single record & it's corresponding path
    /// </summary>
    /// <param name="id">Primary key of the record</param>
    /// <returns>Single record</returns>
    [HttpGet("withPath/{id}")]
    [ApiVersion("0.1")]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [SwaggerResponse(200, "The execution was successful")]
    [SwaggerResponse(204, "No content")]
    [SwaggerResponse(400, "The request was invalid")]
    [SwaggerResponse(401, "Unauthorized access attempted")]
    public ActionResult<GetFileItemResponse> GetOneWithPath(int id)
    {
        var entity = MainRepo.Find(id);
        if (entity == null) return NoContent();

        List<PathModel> path = [];
        path.Add(new PathModel()
        {
            FileItemId = entity.Id,
            PathName = entity.Name,
            SortId = 0
        });
        var parent = entity.ParentNavigation;
        int sortId = 1;
        while (parent != null)
        {
            PathModel parentPath = new PathModel()
            {
                FileItemId = parent.Id,
                PathName = parent.Name,
                SortId = sortId
            };
            path.Add(parentPath);
            sortId += 1;
            parent = parent.ParentNavigation;
        }
        GetFileItemResponse response = new GetFileItemResponse()
        {
            FileItem = entity,
            DirectoryPath = path
        };

        return Ok(response);
    }

    // TODO: put more individual Requests here
}

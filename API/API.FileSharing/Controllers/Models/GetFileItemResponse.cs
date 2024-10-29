namespace API.FileSharing.Controllers.Models;

public class GetFileItemResponse
{
    public FileItem FileItem { get; set; }

    public List<PathModel> DirectoryPath { get; set; }

    public GetFileItemResponse() { }
}

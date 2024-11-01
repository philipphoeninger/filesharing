namespace DAL.FileSharing.Initialization;

public static class SampleData
{
    public static List<User> Users => new()
    {
        new() 
        { 
            UserName = "JohnDoe",
            Email = "john_doe@mail.mailtest",
            PasswordHash = "AQAAAAIAAYagAAAAEGed18XsPagWrAAPb3hyt7t66n9BA03w1ctadgdd09uFUiZ17BSUq1Wv3TRzAK94Jg==",
            SecurityStamp = "A3VLN7PDJ3LPKUGYHXOSG5RFQV3FDWFM",
            ConcurrencyStamp = "3411a4b2-b9a4-4554-b2c8-f90654dc0f0f",
        }
    };

    public static List<FileItem> FileItems(User user) => new()
    {
        new() { Id = 1, Name = "First Folder", IsDeleted = false, ParentId = null, IsFolder = true, Owner = user.Id },
        new() { Id = 2, Name = "First File", IsDeleted = false, ParentId = 1, IsFolder = false, Owner = user.Id },
        new() { Id = 3, Name = "Second File", IsDeleted = false, ParentId = 1, IsFolder = false, Owner = user.Id },
        new() { Id = 4, Name = "Second Folder", IsDeleted = false, ParentId = null, IsFolder = true, Owner = user.Id },
        new() { Id = 5, Name = "Third Folder", IsDeleted = false, ParentId = 4, IsFolder = true, Owner = user.Id },
    };

    public static List<Link> Links(List<FileItem> fileItems, User user) => new()
    {
        new Link("https://www.google.com/", fileItems[0], user)
        { 
            Id = 1,
            ValidUntil = DateTime.MaxValue,
            LastChanged = DateTime.Now,
            IsActive = true,
            Name = "First Link",
            Description = "First description"
        },
        new Link("https://stackoverflow.com/", fileItems[2], user)
        { 
            Id = 2,
            ValidUntil = DateTime.Now,
            LastChanged = DateTime.Now,
            IsActive = false,
            Name = "Second Link",
            Description = "Second description"
        },
    };
}

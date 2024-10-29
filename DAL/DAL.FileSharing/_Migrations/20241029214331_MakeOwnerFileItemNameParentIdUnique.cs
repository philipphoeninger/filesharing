using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.FileSharing._Migrations
{
    /// <inheritdoc />
    public partial class MakeOwnerFileItemNameParentIdUnique : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_FileItems_Owner",
                schema: "dbo",
                table: "FileItems");

            migrationBuilder.CreateIndex(
                name: "IX_User_FileItems_Folder",
                schema: "dbo",
                table: "FileItems",
                columns: new[] { "Owner", "Name", "ParentId" },
                unique: true,
                filter: "[ParentId] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_User_FileItems_Folder",
                schema: "dbo",
                table: "FileItems");

            migrationBuilder.CreateIndex(
                name: "IX_FileItems_Owner",
                schema: "dbo",
                table: "FileItems",
                column: "Owner");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.FileSharing._Migrations
{
    /// <inheritdoc />
    public partial class UpdateItemsAndLinksOwner : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                schema: "dbo",
                table: "Links",
                newName: "Owner")
                .Annotation("SqlServer:IsTemporal", true)
                .Annotation("SqlServer:TemporalHistoryTableName", "LinksAudit")
                .Annotation("SqlServer:TemporalHistoryTableSchema", "dbo")
                .Annotation("SqlServer:TemporalPeriodEndColumnName", "ValidTo")
                .Annotation("SqlServer:TemporalPeriodStartColumnName", "ValidFrom");

            migrationBuilder.RenameIndex(
                name: "IX_Links_UserId",
                schema: "dbo",
                table: "Links",
                newName: "IX_Links_Owner");

            migrationBuilder.AddColumn<string>(
                name: "Owner",
                schema: "dbo",
                table: "FileItems",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "")
                .Annotation("SqlServer:IsTemporal", true)
                .Annotation("SqlServer:TemporalHistoryTableName", "FileItemsAudit")
                .Annotation("SqlServer:TemporalHistoryTableSchema", "dbo")
                .Annotation("SqlServer:TemporalPeriodEndColumnName", "ValidTo")
                .Annotation("SqlServer:TemporalPeriodStartColumnName", "ValidFrom");

            migrationBuilder.CreateIndex(
                name: "IX_FileItems_Owner",
                schema: "dbo",
                table: "FileItems",
                column: "Owner");

            migrationBuilder.AddForeignKey(
                name: "FK_FileItems_User",
                schema: "dbo",
                table: "FileItems",
                column: "Owner",
                principalSchema: "identity",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileItems_User",
                schema: "dbo",
                table: "FileItems");

            migrationBuilder.DropIndex(
                name: "IX_FileItems_Owner",
                schema: "dbo",
                table: "FileItems");

            migrationBuilder.DropColumn(
                name: "Owner",
                schema: "dbo",
                table: "FileItems")
                .Annotation("SqlServer:IsTemporal", true)
                .Annotation("SqlServer:TemporalHistoryTableName", "FileItemsAudit")
                .Annotation("SqlServer:TemporalHistoryTableSchema", "dbo")
                .Annotation("SqlServer:TemporalPeriodEndColumnName", "ValidTo")
                .Annotation("SqlServer:TemporalPeriodStartColumnName", "ValidFrom");

            migrationBuilder.RenameColumn(
                name: "Owner",
                schema: "dbo",
                table: "Links",
                newName: "UserId")
                .Annotation("SqlServer:IsTemporal", true)
                .Annotation("SqlServer:TemporalHistoryTableName", "LinksAudit")
                .Annotation("SqlServer:TemporalHistoryTableSchema", "dbo")
                .Annotation("SqlServer:TemporalPeriodEndColumnName", "ValidTo")
                .Annotation("SqlServer:TemporalPeriodStartColumnName", "ValidFrom");

            migrationBuilder.RenameIndex(
                name: "IX_Links_Owner",
                schema: "dbo",
                table: "Links",
                newName: "IX_Links_UserId");
        }
    }
}

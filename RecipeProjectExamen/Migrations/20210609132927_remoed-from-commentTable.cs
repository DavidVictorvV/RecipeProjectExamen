using Microsoft.EntityFrameworkCore.Migrations;

namespace RecipeProjectExamen.Migrations
{
    public partial class remoedfromcommentTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "idOrder",
                table: "CommentTable");

            migrationBuilder.RenameColumn(
                name: "sentDate",
                table: "CommentTable",
                newName: "SentDate");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SentDate",
                table: "CommentTable",
                newName: "sentDate");

            migrationBuilder.AddColumn<int>(
                name: "idOrder",
                table: "CommentTable",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}

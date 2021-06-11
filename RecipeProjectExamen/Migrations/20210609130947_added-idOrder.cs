using Microsoft.EntityFrameworkCore.Migrations;

namespace RecipeProjectExamen.Migrations
{
    public partial class addedidOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "idOrder",
                table: "CommentTable",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "idOrder",
                table: "CommentTable");
        }
    }
}

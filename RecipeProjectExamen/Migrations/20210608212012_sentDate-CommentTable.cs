using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RecipeProjectExamen.Migrations
{
    public partial class sentDateCommentTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "sentDate",
                table: "CommentTable",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "sentDate",
                table: "CommentTable");
        }
    }
}

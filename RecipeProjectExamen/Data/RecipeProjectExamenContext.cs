using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RecipeProject.Models;
using RecipeProjectExamen.Models;

namespace RecipeProjectExamen.Data
{
    public class RecipeProjectExamenContext : DbContext
    {
        public RecipeProjectExamenContext (DbContextOptions<RecipeProjectExamenContext> options)
            : base(options)
        {
        }

        public DbSet<RecipeProject.Models.User> User { get; set; }

        public DbSet<RecipeProject.Models.Recipe> Recipe { get; set; }

        public DbSet<RecipeProject.Models.IngredientData> IngredientData { get; set; }

        public DbSet<RecipeProject.Models.Ingredient> Ingredient { get; set; }

        public DbSet<RecipeProject.Models.Coments> Coments { get; set; }

        public DbSet<RecipeProject.Models.Rating> Rating { get; set; }

        public DbSet<RecipeProjectExamen.Models.CommentTable> CommentTable { get; set; }
    }
}
